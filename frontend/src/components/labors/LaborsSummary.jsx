import React from "react";

function LaborsSummary({ labor, onEdit, onClose }) {
  const isArray = Array.isArray(labor);
  const data = isArray ? labor : [labor];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Resumen de Labores {isArray ? 'Semanales' : ''}</h4>
        <div>
          <button className="btn btn-primary me-2" onClick={onEdit}>
            Editar
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <table className="table table-bordered table-sm">
            <thead className="table-light">
              <tr>
                <th>Recolector</th>
                <th>Cédula</th>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miércoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
                <th>Sábado</th>
                <th>Días</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((reg, index) => {
                const diasTrabajados = Object.values(reg.dias || {}).filter(d => d !== null).length;
                const totalPago = Object.values(reg.dias || {}).filter(d => d !== null).reduce((sum, d) => sum + (d.valorDia || 0), 0);
                return (
                  <tr key={index}>
                    <td>{reg.recolector || reg.employee}</td>
                    <td>{reg.cedula}</td>
                    <td>{reg.lunes}</td>
                    <td>{reg.martes}</td>
                    <td>{reg.miercoles}</td>
                    <td>{reg.jueves}</td>
                    <td>{reg.viernes}</td>
                    <td>{reg.sabado}</td>
                    <td>{diasTrabajados}</td>
                    <td>${totalPago.toFixed(0)}</td>
                  </tr>
                );
              })}
              {data.length > 0 && (
                <tr className="table-secondary">
                  <td colSpan="8"><strong>TOTAL GENERAL</strong></td>
                  <td><strong>{data.reduce((sum, reg) => sum + Object.values(reg.dias || {}).filter(d => d !== null).length, 0)}</strong></td>
                  <td><strong>${data.reduce((sum, reg) => sum + Object.values(reg.dias || {}).filter(d => d !== null).reduce((s, d) => s + (d.valorDia || 0), 0), 0).toFixed(0)}</strong></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-3 d-flex gap-2">
        <button className="btn btn-secondary" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default LaborsSummary;