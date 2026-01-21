import { useState, useEffect } from "react";

const PRODUCT_TYPE = ["INPUT", "PRODUCTION"];
const UNITS = ["L", "KG", "UN"];

function ProductsForm({ onSave, onCancel, product }) {

  const [name, setName] = useState(product?.name || "");
  const [product_type, setProductType] = useState(product?.product_type || "");
  const [category_id, setCategoryId] = useState(product?.category_id || "");
  const [unit, setUnit] = useState(product?.unit || "");
  const [stock, setStock] = useState(product?.stock || 0);
  const [status, setStatus] = useState(product?.status || "ACTIVE");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      name,
      product_type,
      category_id,
      unit,
      stock,
      status
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="mb-3">
        {product ? "Edit Product" : "Add Product"}
      </h4>

      <div className="mb-2">
        <label className="form-label">Name</label>
        <input className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Product Type</label>
        <select className="form-select"
          value={product_type}
          onChange={(e) => setProductType(e.target.value)}
          required
        >
          <option value="">- Select -</option>
          {PRODUCT_TYPE.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label className="form-label">Category</label>
        <select className="form-select"
          value={category_id}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">- Select -</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="row mb-2">
        <div className="col-6">
          <label className="form-label">Unit</label>
          <select className="form-select"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
          >
            <option value="">- Select -</option>
            {UNITS.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>

        <div className="col-6">
          <label className="form-label">Initial Stock</label>
          <input
            type="number"
            className="form-control"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Status</label>
        <select className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-success" type="submit">Save</button>
        <button className="btn btn-secondary" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ProductsForm;
