import { useState, useEffect } from "react";
import EmployeesModal from "./EmployeesModal.jsx";

function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Para editar

  // Fetch de empleados
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("http://localhost:3000/employees");
        const data = await res.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

   

  // Guardar o actualizar empleado
  const handleSave = async (employee) => {
    try {
      if (selectedEmployee) {
        // EDITAR
        const res = await fetch(
          `http://localhost:3000/employees/${selectedEmployee.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employee),
          }
        );
        const updatedEmployee = await res.json();
        setEmployees(
          employees.map((emp) =>
            emp.id === updatedEmployee.id ? updatedEmployee : emp
          )
        );
      } else {
        // CREAR
        const res = await fetch("http://localhost:3000/employees", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employee),
        });
        const newEmployee = await res.json();
        setEmployees([...employees, newEmployee]);
      }
      setShowModal(false);
      setSelectedEmployee(null);
    } catch (error) {
      console.error("Error saving employee:", error);
      alert("Error saving employee, try again.");
    }
  };

  // Editar: abre modal con datos prellenados
  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  // Eliminar empleado
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await fetch(`http://localhost:3000/employees/${id}`, {
        method: "DELETE",
      });
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Error deleting employee, try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary">Employees</h2>
        <button
          className="btn btn-success"
          onClick={() => {
            setSelectedEmployee(null);
            setShowModal(true);
          }}
        >
          + Add Employee
        </button>
      </div>

      {/* Tabla */}
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>ID Number</th>
              <th>Phone</th>
              <th>Address</th>
              <th >Farm ID</th>
              <th>Hire Date</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-3">
                  No employees found
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.id_number}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.address}</td>
                  <td>{emp.farm_id}</td>
                  <td>{emp.hire_date}</td>
                  <td>{emp.role}</td>
                  <td>
                    <span
                      className={`badge ${
                        emp.status === "active" ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-1"
                      onClick={() => handleEdit(emp)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
  <EmployeesModal
    onCancel={() => setShowModal(false)}
    onSave={handleSave} 
    employee={selectedEmployee} // <-- pasa el empleado al modal
  />
)}

      
    </div>
  );
}

export default EmployeesList;
