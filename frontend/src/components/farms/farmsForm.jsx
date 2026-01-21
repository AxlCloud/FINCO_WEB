import { useState } from "react";

function FarmsForm({farm,onSave,onCancel}){
  const [name, setName] = useState(farm ?.name||"");
  const [location, setLocation] = useState(farm ?.location ||"");
  const [area, setArea] = useState(farm ?.area ||"");
  const [areaUnit, setAreaUnit] = useState(farm ?.areaUnit ||"");
  const [status, setStatus] = useState(farm?.status || "");


  const handleSubmit = (e) => {
    e.preventDefault();
    const farm = {
        name,
        location,
        area,
        area_unit :areaUnit,
        status
    }
    onSave(farm);
  }
return(
    <div className="container-form">
        <form onSubmit={handleSubmit}>
            <h3 className="mb-3">Add Farm</h3>
            <div className="mb-2">
                <label className="form-label">Name</label>
                <input className="form-control" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="mb-2">
                <label className="form-label">Location</label>
                <input className="form-control" value={location} onChange={e => setLocation(e.target.value)} required />
            </div>
            <div className="row mb-2">
                <div className="col-8">
                <label className="form-label">Area</label>
                <input className="form-control" value={area} onChange={e => setArea(e.target.value)} required />
                </div>
                <div className="col-4">
                <label className="form-label">Unit</label>
                <input className="form-control" value={areaUnit} onChange={e => setAreaUnit(e.target.value)} required />
                <option value="ha">Hectares</option>
                 <option value="m2">m²</option>
                </div>
            </div>
                <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                className="form-select"
                value={status}
                onChange={e => setStatus(e.target.value)}
                >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                </select>
          </div>
         <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
        </form>
    </div>

);

}
export default FarmsForm;