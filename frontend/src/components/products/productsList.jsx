import { useEffect, useState } from "react";
import ProductsModal from "./productsModal";
import CategoriesModal from "./categories/categoriesModal";

function ProductsList() {

  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

 useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3000/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchProducts();
}, []);



  const handleSave = async (productData) => {
    try {
      if (selectedProduct) {
        const res = await fetch(
          `http://localhost:3000/products/${selectedProduct.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
          }
        );

        const updated = await res.json();
        setProducts(prev =>
          prev.map(p => p.id === updated.id ? updated : p)
        );
      } else {
        const res = await fetch("http://localhost:3000/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });

        const newProduct = await res.json();
        setProducts(prev => [...prev, newProduct]);
      }

      setShowModal(false);
      setSelectedProduct(null);

    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleSaveCategory = async (categoryData) => {
    try {
      if (selectedCategory) {
        const res = await fetch(
          `http://localhost:3000/categories/${selectedCategory.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoryData),
          }
        );
      } else {
        const res = await fetch("http://localhost:3000/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(categoryData),
        });
      }

      setShowCategoriesModal(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete product?")) return;

    await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE"
    });

    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>Products</h3>
        <div>
          <button className="btn btn-primary me-2"
            onClick={() => {
              setSelectedCategory(null);
              setShowCategoriesModal(true);
            }}>
            + Add Category
          </button>
          <button className="btn btn-success"
            onClick={() => {
              setSelectedProduct(null);
              setShowModal(true);
            }}>
            + Add Product
          </button>
        </div>
      </div>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Unit</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>
                <span className={`badge ${
                  p.product_type === "INPUT" ? "bg-warning text-dark" : "bg-success"
                }`}>
                  {p.product_type}
                </span>
              </td>
              <td>{p.unit}</td>
              <td>{p.stock}</td>
              <td>
                <span className={`badge ${
                  p.status === "ACTIVE" ? "bg-success" : "bg-secondary"
                }`}>
                  {p.status}
                </span>
              </td>
              <td>
                <button className="btn btn-sm btn-warning me-1"
                  onClick={() => {
                    setSelectedProduct(p);
                    setShowModal(true);
                  }}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(p.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <ProductsModal
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
          product={selectedProduct}
        />
      )}

      {showCategoriesModal && (
        <CategoriesModal
          onSave={handleSaveCategory}
          onCancel={() => setShowCategoriesModal(false)}
          category={selectedCategory}
        />
      )}
    </div>
  );
}

export default ProductsList;
