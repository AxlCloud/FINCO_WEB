import React, { useState } from "react";

const TAX_TYPES = [
  { label: "IVA", value: "iva", rates: [5, 19] },
  { label: "Withholding Tax", value: "retencion", rates: [1, 2.5, 3.5] },
  { label: "ICA", value: "reteica", rates: [0.5, 1] },
];

const CATEGORIES = [
  "Office Supplies",
  "Utilities",
  "Travel",
  "Marketing",
  "Rent",
  "Insurance",
  "Maintenance",
  "Other"
];

const expenseNumber = "EXP-0001"; // por ahora fijo o generado

function ExpensesForm({ onSave, onCancel }) {
  const [supplier, setSupplier] = useState("");
  const [date, setDate] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [taxType, setTaxType] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [notes, setNotes] = useState("");

  const selectedTax = TAX_TYPES.find((t) => t.value === taxType);

  const subtotal = parseFloat(amount) || 0;
  const taxAmount = subtotal * ((parseFloat(taxRate) || 0) / 100);
  const total = subtotal + taxAmount;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ supplier, date, invoiceNumber, description, category, amount, taxType, taxRate, paymentMethod, notes, total });
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>New Expense</h4>
          <span className="badge bg-primary fs-6">
            Expense No. {expenseNumber}
          </span>
        </div>

        {/* HEADER */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Supplier</label>
            <input
              className="form-control"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Invoice Number</label>
            <input
              className="form-control"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Description</label>
            <input
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
              min="0"
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Tax Type</label>
            <select
              className="form-select"
              value={taxType}
              onChange={(e) => {
                setTaxType(e.target.value);
                setTaxRate("");
              }}
            >
              <option value="">None</option>
              {TAX_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Tax %</label>
            <select
              className="form-select"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              disabled={!taxType}
            >
              <option value="">0%</option>
              {selectedTax?.rates.map((r) => (
                <option key={r} value={r}>
                  {r}%
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Payment Method</label>
            <select
              className="form-select"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="">Select Payment Method</option>
              <option value="cash">Cash</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
              <option value="transfer">Bank Transfer</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Notes</label>
            <textarea
              className="form-control"
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* TOTAL */}
        <div className="alert alert-info">
          <p>Subtotal: ${subtotal.toLocaleString()}</p>
          <p>Tax: ${taxAmount.toLocaleString()}</p>
          <h5>Total: ${total.toLocaleString()}</h5>
        </div>

        {/* ACTIONS */}
        <div className="mt-3 d-flex gap-2">
          <button className="btn btn-primary" type="submit">
            Save Expense
          </button>
          <button className="btn btn-outline-secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExpensesForm;