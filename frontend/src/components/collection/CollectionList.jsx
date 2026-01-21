import React, { useEffect, useState, useMemo } from "react";

function CollectionList({ onCreate, onView }) {
  const [collections, setCollections] = useState([]);
  const [mesFilter, setMesFilter] = useState("");
  const [semanaFilter, setSemanaFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/collections")
      .then(res => res.json())
      .then(data => setCollections(data));
  }, []);

  const filteredCollections = useMemo(() => {
    let filtered = collections;
    if (mesFilter) {
      filtered = filtered.filter(c => c.mes === mesFilter);
    }
    if (semanaFilter) {
      filtered = filtered.filter(c => c.semana == semanaFilter);
    }
    return filtered;
  }, [collections, mesFilter, semanaFilter]);

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Collections</h5>
        <button className="btn btn-primary btn-sm" onClick={onCreate}>
          + Create Collection
        </button>
      </div>

      <div className="card-body">
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Mes</label>
            <select
              className="form-control"
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
            <select
              className="form-control"
              value={semanaFilter}
              onChange={(e) => setSemanaFilter(e.target.value)}
            >
              <option value="">Todas</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
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
              <th>Recolector</th>
              <th>Cédula</th>
              <th>Mes</th>
              <th>Semana</th>
              <th>Día</th>
              <th>Kilos</th>
              <th>Valor/Kg</th>
              <th>Lote</th>
              <th>Tipo Café</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCollections.map(collection => (
              <tr key={collection.id} onClick={() => onView(collection)} style={{ cursor: "pointer" }}>
                <td>{collection.id}</td>
                <td>{collection.recolector}</td>
                <td>{collection.cedula}</td>
                <td>{collection.mes}</td>
                <td>{collection.semana}</td>
                <td>{collection.dia}</td>
                <td>{collection.kilos}</td>
                <td>${collection.valorKilo}</td>
                <td>{collection.lot}</td>
                <td>{collection.coffeeType}</td>
                <td>
                  <span className={`badge ${collection.status === "COMPLETED" ? "bg-success" : "bg-secondary"}`}>
                    {collection.status}
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

export default CollectionList;