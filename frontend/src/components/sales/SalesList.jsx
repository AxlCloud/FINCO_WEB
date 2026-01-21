import React, { useEffect, useState } from "react";

function SalesList({ onCreate, onView }) {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/sales")
      .then(res => res.json())
      .then(data => {
        setSales(data);
        setFilteredSales(data);
      });
  }, []);

  useEffect(() => {
    let filtered = sales;
    if (dateFrom) {
      filtered = filtered.filter(s => new Date(s.date) >= new Date(dateFrom));
    }
    if (dateTo) {
      filtered = filtered.filter(s => new Date(s.date) <= new Date(dateTo));
    }
    setFilteredSales(filtered);
  }, [sales, dateFrom, dateTo]);

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Ventas</h5>
        <button className="btn btn-primary btn-sm" onClick={onCreate}>
          + Crear venta
        </button>
      </div>

      <div className="card-body">
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Fecha Desde</label>
            <input
              type="date"
              className="form-control"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Fecha Hasta</label>
            <input
              type="date"
              className="form-control"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
          <div className="col-md-4 d-flex align-items-end">
            <button className="btn btn-secondary" onClick={() => { setDateFrom(""); setDateTo(""); }}>
              Limpiar Filtros
            </button>
          </div>
        </div>

        <table className="table table-bordered table-sm">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map(sale => (
              <tr key={sale.id} onClick={() => onView(sale)} style={{ cursor: "pointer" }}>
                <td>{sale.id}</td>
                <td>{sale.date}</td>
                <td>{sale.partner_name}</td>
                <td>${sale.total}</td>
                <td>
                  <span className={`badge ${sale.status === "PAID" ? "bg-success" : "bg-secondary"}`}>
                    {sale.status}
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

export default SalesList;
