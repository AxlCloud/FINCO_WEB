import React from "react";
import EmployeesForm from "./EmployeesForm.jsx";

function EmployeesModal({ onCancel, onSave,employee }) {
  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content p-4 border border-primary shadow">
          <EmployeesForm onSave={onSave} onCancel={onCancel} employee={employee} />
        </div>
      </div>
    </div>
  );
}

export default EmployeesModal;
