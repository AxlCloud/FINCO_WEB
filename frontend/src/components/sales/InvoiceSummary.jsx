import React from "react";

const TAX_TYPES = [
  { label: "IVA", value: "iva", rates: [5, 19] },
  { label: "Withholding Tax", value: "retencion", rates: [1, 2.5, 3.5] },
  { label: "ICA", value: "reteica", rates: [0.5, 1] },
];

function InvoiceSummary({ sale, onEdit, onCreditNote, onDebitNote, onClose }) {
  const { customer, date, paymentMethod, items, notes, total } = sale;

  const subtotalTotal = items.reduce((sum, item) => sum + (item.quantity || 0) * (item.price || 0), 0);

  const ivaTotal = items.reduce((sum, item) => {
    if (item.taxType === 'iva') {
      const itemSubtotal = (item.quantity || 0) * (item.price || 0);
      return sum + itemSubtotal * ((item.taxRate || 0) / 100);
    }
    return sum;
  }, 0);

  const withholdingTotal = items.reduce((sum, item) => {
    if (item.taxType === 'retencion') {
      const itemSubtotal = (item.quantity || 0) * (item.price || 0);
      return sum + itemSubtotal * ((item.taxRate || 0) / 100);
    }
    return sum;
  }, 0);

  const icaTotal = items.reduce((sum, item) => {
    if (item.taxType === 'reteica') {
      const itemSubtotal = (item.quantity || 0) * (item.price || 0);
      return sum + itemSubtotal * ((item.taxRate || 0) / 100);
    }
    return sum;
  }, 0);

  const taxTotal = ivaTotal + withholdingTotal + icaTotal;

  const invoiceNumber = "FV-0001"; // por ahora fijo

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Invoice Summary</h4>
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
              <strong>Invoice No.:</strong> {invoiceNumber}
            </div>
            <div className="col-md-4 text-center">
              <strong>Date:</strong> {date}
            </div>
            <div className="col-md-4 text-end">
              <strong>Payment Method:</strong> {paymentMethod}
            </div>
          </div>
          <div className="mt-2">
            <strong>Customer:</strong> {customer}
          </div>
        </div>
        <div className="card-body">
          <h5>Products</h5>
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Tax Type</th>
                <th>Tax %</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => {
                const itemSubtotal = (item.quantity || 0) * (item.price || 0);
                return (
                  <tr key={i}>
                    <td>{item.product}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                    <td>{item.taxType ? TAX_TYPES.find(t => t.value === item.taxType)?.label : 'None'}</td>
                    <td>{item.taxRate}%</td>
                    <td className="text-end">${itemSubtotal.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

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
                <p>Subtotal: ${subtotalTotal.toLocaleString()}</p>
                <p>IVA: ${ivaTotal.toLocaleString()}</p>
                <p>Withholding Tax: ${withholdingTotal.toLocaleString()}</p>
                <p>ICA: ${icaTotal.toLocaleString()}</p>
                <p>Taxes: ${taxTotal.toLocaleString()}</p>
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

export default InvoiceSummary;