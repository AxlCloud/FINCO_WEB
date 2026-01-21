import React, { useEffect, useState } from "react";

function ExpensesList({ onCreate, onView }) {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/expenses")
      .then(res => res.json())
      .then(data => {
        setExpenses(data);
        setFilteredExpenses(data);
      });
  }, []);

  useEffect(() => {
    let filtered = expenses;
    if (dateFrom) {
      filtered = filtered.filter(e => new Date(e.date) >= new Date(dateFrom));
    }
    if (dateTo) {
      filtered = filtered.filter(e => new Date(e.date) <= new Date(dateTo));
    }
    setFilteredExpenses(filtered);
  }, [expenses, dateFrom, dateTo]);

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Expenses</h5>
        <button className="btn btn-primary btn-sm" onClick={onCreate}>
          + Create Expense
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
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map(expense => (
              <tr key={expense.id} onClick={() => onView(expense)} style={{ cursor: "pointer" }}>
                <td>{expense.id}</td>
                <td>{expense.date}</td>
                <td>{expense.supplier}</td>
                <td>{expense.description}</td>
                <td>{expense.category}</td>
                <td>${expense.amount}</td>
                <td>
                  <span className={`badge ${expense.status === "PAID" ? "bg-success" : "bg-secondary"}`}>
                    {expense.status}
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

export default ExpensesList;