import React, { useEffect, useState } from "react";

function LaborsList({ onCreate, onView }) {
  const [labors, setLabors] = useState([]);
  const [filteredLabors, setFilteredLabors] = useState([]);
  const [mesFilter, setMesFilter] = useState("");
  const [semanaFilter, setSemanaFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/labors")
      .then(res => res.json())
      .then(data => {
        setLabors(data);
        setFilteredLabors(data);
      });
  }, []);

  useEffect(() => {
    let filtered = labors;
    if (mesFilter) {
      filtered = filtered.filter(l => l.mes === mesFilter);
    }
    if (semanaFilter) {
      filtered = filtered.filter(l => l.semana == semanaFilter);
    }
    setFilteredLabors(filtered);
  }, [labors, mesFilter, semanaFilter]);

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Labors</h5>
        <button className="btn btn-primary btn-sm" onClick={onCreate}>
          + Create Labor Plan
        </button>
      </div>

      <div className="card-body">
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Mes</label>
            <select
              className="form-select"
              value={mesFilter}
              onChange={(e) => setMesFilter(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Enero">Enero</option>
              <option value="Febrero">Febrero</option>
              <option value="Marzo">Marzo</option>
              <option value="Abril">Abril</option>
              <option value="Mayo">Mayo</option>
              <option value="Junio">Junio</option>
              <option value="Julio">Julio</option>
              <option value="Agosto">Agosto</option>
              <option value="Septiembre">Septiembre</option>
              <option value="Octubre">Octubre</option>
              <option value="Noviembre">Noviembre</option>
              <option value="Diciembre">Diciembre</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Semana</label>
            <input
              type="number"
              className="form-control"
              value={semanaFilter}
              onChange={(e) => setSemanaFilter(e.target.value)}
              placeholder="Número de semana"
            />
          </div>
          <div className="col-md-4 d-flex align-items-end">
            <button className="btn btn-secondary" onClick={() => { setMesFilter(""); setSemanaFilter(""); }}>
              Limpiar Filtros
            </button>
          </div>
        </div>

        <table className="table table-bordered table-sm">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Mes</th>
              <th>Semana</th>
              <th>Fecha Inicio</th>
              <th>Total Días</th>
              <th>Total Pago</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLabors.map(labor => (
              <tr key={labor.id} onClick={() => onView(labor)} style={{ cursor: "pointer" }}>
                <td>{labor.id}</td>
                <td>{labor.mes}</td>
                <td>{labor.semana}</td>
                <td>{labor.fechaInicio}</td>
                <td>{labor.total_dias || labor.total_days}</td>
                <td>${labor.total_pago || labor.total_value}</td>
                <td>
                  <span className={`badge ${labor.status === "COMPLETED" ? "bg-success" : "bg-secondary"}`}>
                    {labor.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LaborsList;