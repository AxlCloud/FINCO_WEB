import { useState } from "react";

const POSITIONS = [
  "Farm Manager",
  "Field Worker",
  "Operator",
  "Harvester",
  "Supervisor"
];
const POSITIONS2 =[
  "active",
  "inactive"
]

function EmployeesForm({ onSave, onCancel, employee }) {
  const [name, setName] = useState(employee?.name ||"");
  const [id_number, setIdNumber] = useState(employee?.id_number||"");
  const [phone, setPhone] = useState(employee?.phone||"");
  const [address, setAddress] = useState(employee.address||"");
  const [farm_id, setFarmId] = useState(employee?.farm_id ||"");
  const [hire_date, setHireDate] = useState(employee?.hire_date||"");
  const [role, setRole] = useState(employee?.hire_date||"");
  const [status, setStatus] = useState(employee?.status||"");

  const handleSubmit = (e) => {
    e.preventDefault();

    const employee = {
      name,
      id_number,
      phone,
      address,
      farm_id,
      hire_date,
      role,
      status
    };

    onSave(employee);
  };

  return (
    <div className="container-form">
      <form onSubmit={handleSubmit}>
        <h3 className="mb-3">Add Employee</h3>

        <div className="mb-2">
          <label className="form-label">Name</label>
          <input className="form-control" value={name} onChange={e => setName(e.target.value)} required />
        </div>

        <div className="mb-2">
          <label className="form-label">ID Number</label>
          <input className="form-control" value={id_number} onChange={e => setIdNumber(e.target.value)} required />
        </div>

        <div className="mb-2">
          <label className="form-label">Phone</label>
          <input className="form-control" value={phone} onChange={e => setPhone(e.target.value)} required />
        </div>

        <div className="mb-2">
          <label className="form-label">Address</label>
          <input className="form-control" value={address} onChange={e => setAddress(e.target.value)} />
        </div>

        <div className="mb-2">
          <label className="form-label">Hire Date</label>
          <input type="date" className="form-control" value={hire_date} onChange={e => setHireDate(e.target.value)} required />
        </div>

        <div className="mb-2">
          <label className="form-label">Role</label>
          <select className="form-select" value={role} onChange={e => setRole(e.target.value)}>
            <option value="">-- Select Role --</option>
            {POSITIONS.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label className="form-label">Status</label>
          <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
            <option value="">-- Select Status --</option>
            {POSITIONS2.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button className="btn btn-success" type="submit">Save</button>
          <button className="btn btn-secondary" type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EmployeesForm;
