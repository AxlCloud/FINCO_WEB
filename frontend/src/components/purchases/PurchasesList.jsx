import React, { useEffect, useState } from "react";

function PurchasesList({ onCreate, onView }) {
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/purchases")
      .then(res => res.json())
      .then(data => {
        setPurchases(data);
        setFilteredPurchases(data);
      });
  }, []);

  useEffect(() => {
    let filtered = purchases;
    if (dateFrom) {
      filtered = filtered.filter(p => new Date(p.date) >= new Date(dateFrom));
    }
    if (dateTo) {
      filtered = filtered.filter(p => new Date(p.date) <= new Date(dateTo));
    }
    setFilteredPurchases(filtered);
  }, [purchases, dateFrom, dateTo]);

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Purchases</h5>
        <button className="btn btn-primary btn-sm" onClick={onCreate}>
          + Create Purchase
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
              <th>Date</th>
              <th>Supplier</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchases.map(purchase => (
              <tr key={purchase.id} onClick={() => onView(purchase)} style={{ cursor: "pointer" }}>
                <td>{purchase.id}</td>
                <td>{purchase.date}</td>
                <td>{purchase.supplier_name}</td>
                <td>${purchase.total}</td>
                <td>
                  <span className={`badge ${purchase.status === "PAID" ? "bg-success" : "bg-secondary"}`}>
                    {purchase.status}
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

export default PurchasesList;