import { useEffect, useState } from "react";
import ProductsModal from "./productsModal";

function ProductsList() {

  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

 
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3000/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
   useEffect(() => {
    fetchProducts();
  }, []);


  const handleSave = async (productData) => {
    try {
      const res = await fetch("http://localhost:3000/products", {
        method: selectedProduct ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
      });

      const savedProduct = await res.json();

      if (selectedProduct) {
        setProducts(prev =>
          prev.map(p => p.id === savedProduct.id ? savedProduct : p)
        );
      } else {
        setProducts(prev => [...prev, savedProduct]);
      }

      setShowModal(false);
      setSelectedProduct(null);

    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE"
      });
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>Products</h3>
        <button
          className="btn btn-success"
          onClick={() => {
            setSelectedProduct(null);
            setShowModal(true);
          }}
        >
          + Add Product
        </button>
      </div>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Unit</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No products found
              </td>
            </tr>
          ) : (
            products.map(prod => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.name}</td>
                <td>{prod.category_name}</td>
                <td>{prod.unit}</td>
                <td>
                  <span className={`badge ${
                    prod.type === "INPUT" ? "bg-info" : "bg-success"
                  }`}>
                    {prod.type}
                  </span>
                </td>
                <td>
                  <span className={`badge ${
                    prod.status === "ACTIVE" ? "bg-success" : "bg-secondary"
                  }`}>
                    {prod.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-1"
                    onClick={() => {
                      setSelectedProduct(prod);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(prod.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showModal && (
        <ProductsModal
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
          product={selectedProduct}
        />
      )}
    </div>
  );
}

export default ProductsList;
