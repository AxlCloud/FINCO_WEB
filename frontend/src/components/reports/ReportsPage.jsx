import React, { useState, useEffect } from "react";

function ReportsPage() {
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [collections, setCollections] = useState([]);
  const [labors, setLabors] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    // Fetch all data
    Promise.all([
      fetch("http://localhost:3000/sales").then(res => res.json()),
      fetch("http://localhost:3000/purchases").then(res => res.json()),
      fetch("http://localhost:3000/expenses").then(res => res.json()),
      fetch("http://localhost:3000/collections").then(res => res.json()),
      fetch("http://localhost:3000/labors").then(res => res.json())
    ]).then(([salesData, purchasesData, expensesData, collectionsData, laborsData]) => {
      setSales(salesData);
      setPurchases(purchasesData);
      setExpenses(expensesData);
      setCollections(collectionsData);
      setLabors(laborsData);
    });
  }, []);

  const filterByDate = (data) => {
    return data.filter(item => {
      const itemDate = new Date(item.date || item.fechaInicio);
      const from = dateFrom ? new Date(dateFrom) : null;
      const to = dateTo ? new Date(dateTo) : null;
      return (!from || itemDate >= from) && (!to || itemDate <= to);
    });
  };

  const filteredSales = filterByDate(sales);
  const filteredPurchases = filterByDate(purchases);
  const filteredExpenses = filterByDate(expenses);
  const filteredCollections = filterByDate(collections);
  const filteredLabors = labors; // labors no tienen date directo, pero podemos filtrar por mes/semana si es necesario

  const totalSales = filteredSales.reduce((sum, s) => sum + parseFloat(s.total || 0), 0);
  const totalPurchases = filteredPurchases.reduce((sum, p) => sum + parseFloat(p.total || 0), 0);
  const totalExpenses = filteredExpenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);
  const totalCollectionsValue = filteredCollections.reduce((sum, c) => sum + (parseFloat(c.kilos || 0) * parseFloat(c.valorKilo || 0)), 0);
  const totalLaborsCost = filteredLabors.reduce((sum, l) => sum + parseFloat(l.total_pago || l.total_value || 0), 0);

  const netProfit = totalSales + totalCollectionsValue - totalPurchases - totalExpenses - totalLaborsCost;

  return (
    <div className="container mt-4">
      <h2>Informes y Reportes</h2>

      <div className="row mb-4">
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

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h5>Ingresos</h5>
            </div>
            <div className="card-body">
              <p>Ventas: ${totalSales.toFixed(2)}</p>
              <p>Recolección: ${totalCollectionsValue.toFixed(2)}</p>
              <p><strong>Total Ingresos: ${(totalSales + totalCollectionsValue).toFixed(2)}</strong></p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h5>Gastos</h5>
            </div>
            <div className="card-body">
              <p>Compras: ${totalPurchases.toFixed(2)}</p>
              <p>Gastos: ${totalExpenses.toFixed(2)}</p>
              <p>Labores: ${totalLaborsCost.toFixed(2)}</p>
              <p><strong>Total Gastos: ${(totalPurchases + totalExpenses + totalLaborsCost).toFixed(2)}</strong></p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5>Ganancia Neta</h5>
        </div>
        <div className="card-body">
          <h3 className={netProfit >= 0 ? "text-success" : "text-danger"}>
            ${netProfit.toFixed(2)}
          </h3>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Resumen de Ventas</h5>
            </div>
            <div className="card-body">
              <p>Total Ventas: {filteredSales.length}</p>
              <p>Monto Total: ${totalSales.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Resumen de Compras</h5>
            </div>
            <div className="card-body">
              <p>Total Compras: {filteredPurchases.length}</p>
              <p>Monto Total: ${totalPurchases.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Resumen de Gastos</h5>
            </div>
            <div className="card-body">
              <p>Total Gastos: {filteredExpenses.length}</p>
              <p>Monto Total: ${totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Resumen de Labores</h5>
            </div>
            <div className="card-body">
              <p>Total Planes de Labores: {filteredLabors.length}</p>
              <p>Costo Total: ${totalLaborsCost.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h5>Resumen de Recolección</h5>
        </div>
        <div className="card-body">
          <p>Total Recolecciones: {filteredCollections.length}</p>
          <p>Kilos Totales: {filteredCollections.reduce((sum, c) => sum + parseFloat(c.kilos || 0), 0).toFixed(2)} kg</p>
          <p>Valor Total: ${totalCollectionsValue.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;