import { useState } from "react";

const CATEGORY_STATUS = ["ACTIVE", "INACTIVE"];

function CategoriesForm({ onSave, onCancel, category }) {

  const [name, setName] = useState(category?.name || "");
  const [description, setDescription] = useState(category?.description || "");
  const [status, setStatus] = useState(category?.status || "ACTIVE");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      name,
      description,
      status
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="mb-3">
        {category ? "Edit Category" : "Add Category"}
      </h4>

      <div className="mb-2">
        <label className="form-label">Name</label>
        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Description</label>
        <input
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Status</label>
        <select
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {CATEGORY_STATUS.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
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

export default CategoriesForm;
