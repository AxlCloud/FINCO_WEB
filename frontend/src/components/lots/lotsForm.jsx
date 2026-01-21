import { useState } from "react";

function LotsForm({ onSave, onCancel, lot, farmId }) {
  const [name, setName] = useState(lot?.name || "");
  const [area, setArea] = useState(lot?.area || "");
  const [crop, setCrop] = useState(lot?.crop || "");
  const [status, setStatus] = useState(lot?.status || "ACTIVE");

  const handleSubmit = (e) => {
    e.preventDefault();

    const lotData = {
      farm_id: farmId,
      name,
      area,
      crop,
      status,
    };

    onSave(lotData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="mb-3">Lot</h4>

      <div className="mb-2">
        <label className="form-label">Lot Name</label>
        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Area (ha)</label>
        <input
          type="number"
          className="form-control"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Crop</label>
        <input
          className="form-control"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          placeholder="Coffee, Banana..."
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Status</label>
        <select
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button type="submit" className="btn btn-success">
          Save
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default LotsForm;
