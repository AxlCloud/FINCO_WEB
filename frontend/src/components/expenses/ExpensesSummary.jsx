import React from "react";

const TAX_TYPES = [
  { label: "IVA", value: "iva", rates: [5, 19] },
  { label: "Withholding Tax", value: "retencion", rates: [1, 2.5, 3.5] },
  { label: "ICA", value: "reteica", rates: [0.5, 1] },
];

function ExpensesSummary({ expense, onEdit, onCreditNote, onDebitNote, onClose }) {
  const { supplier, date, invoiceNumber, description, category, amount, taxType, taxRate, paymentMethod, notes, total } = expense;

  const subtotal = parseFloat(amount) || 0;
  const taxAmount = subtotal * ((parseFloat(taxRate) || 0) / 100);

  const expenseNumber = "EXP-0001"; // por ahora fijo

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Expense Summary</h4>
        <div>
          <button className="btn btn-primary me-2" onClick={onEdit}>
            Edit
          </button>
          <button className="btn btn-warning me-2" onClick={onCreditNote}>
            Credit Note
          </button>
          <button className="btn btn-info" onClick={onDebitNote}>
            Debit Note
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-md-4">
              <strong>Expense No.:</strong> {expenseNumber}
            </div>
            <div className="col-md-4 text-center">
              <strong>Date:</strong> {date}
            </div>
            <div className="col-md-4 text-end">
              <strong>Payment Method:</strong> {paymentMethod}
            </div>
          </div>
          <div className="mt-2">
            <strong>Supplier:</strong> {supplier}
          </div>
          {invoiceNumber && (
            <div>
              <strong>Invoice Number:</strong> {invoiceNumber}
            </div>
          )}
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Description:</strong> {description}
            </div>
            <div className="col-md-6">
              <strong>Category:</strong> {category}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Amount:</strong> ${subtotal.toLocaleString()}
            </div>
            <div className="col-md-6">
              <strong>Tax:</strong> {taxType ? `${TAX_TYPES.find(t => t.value === taxType)?.label} ${taxRate}%` : 'None'} - ${taxAmount.toLocaleString()}
            </div>
          </div>

          {notes && (
            <div className="mt-3">
              <strong>Notes:</strong> {notes}
            </div>
          )}

          <div className="row mt-3">
            <div className="col-md-6">
              {/* Empty for spacing */}
            </div>
            <div className="col-md-6">
              <div className="alert alert-info">
                <p>Subtotal: ${subtotal.toLocaleString()}</p>
                <p>Tax: ${taxAmount.toLocaleString()}</p>
                <h5>Total: ${total.toLocaleString()}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 d-flex gap-2">
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ExpensesSummary;