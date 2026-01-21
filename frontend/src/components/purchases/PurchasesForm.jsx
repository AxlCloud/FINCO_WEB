import React, { useState } from "react";

const TAX_TYPES = [
  { label: "IVA", value: "iva", rates: [5, 19] },
  { label: "Withholding Tax", value: "retencion", rates: [1, 2.5, 3.5] },
  { label: "ICA", value: "reteica", rates: [0.5, 1] },
];

const purchaseNumber = "PC-0001"; // por ahora fijo o generado

function PurchasesForm({ onSave, onCancel }) {
  const [supplier, setSupplier] = useState("");
  const [date, setDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [items, setItems] = useState([
    { product: "", quantity: "", price: "", taxType: "", taxRate: "" },
  ]);
  const [notes, setNotes] = useState("");

  /* ================= ITEMS ================= */

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    if (field === "taxType") {
      updated[index].taxRate = ""; // Reset rate when type changes
    }
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { product: "", quantity: "", price: "", taxType: "", taxRate: "" }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  /* ================= TOTAL ================= */

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

  const total = subtotalTotal + taxTotal;

  /* ================= SAVE ================= */

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ supplier, date, paymentMethod, items, notes, total });
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>New Purchase</h4>
          <span className="badge bg-primary fs-6">
            Purchase No. {purchaseNumber}
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
        </div>

        {/* ITEMS */}
        <h5>Products</h5>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Tax Type</th>
                <th>Tax %</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => {
                const selectedTax = TAX_TYPES.find((t) => t.value === item.taxType);
                const itemSubtotal = (item.quantity || 0) * (item.price || 0);
                return (
                  <tr key={i}>
                    <td>
                      <input
                        className="form-control"
                        value={item.product}
                        onChange={(e) =>
                          handleItemChange(i, "product", e.target.value)
                        }
                        placeholder="Coffee Beans"
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(i, "quantity", e.target.value)
                        }
                        min="1"
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(i, "price", e.target.value)
                        }
                        step="0.01"
                        min="0"
                        required
                      />
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={item.taxType}
                        onChange={(e) =>
                          handleItemChange(i, "taxType", e.target.value)
                        }
                      >
                        <option value="">None</option>
                        {TAX_TYPES.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={item.taxRate}
                        onChange={(e) =>
                          handleItemChange(i, "taxRate", e.target.value)
                        }
                        disabled={!item.taxType}
                      >
                        <option value="">0%</option>
                        {selectedTax?.rates.map((r) => (
                          <option key={r} value={r}>
                            {r}%
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="text-end">
                      ${itemSubtotal.toLocaleString()}
                    </td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => removeItem(i)}
                        disabled={items.length === 1}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button type="button" className="btn btn-secondary mb-3" onClick={addItem}>
          + Add Product
        </button>

        {/* NOTES AND TOTAL */}
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Notes</label>
              <textarea
                className="form-control"
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
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

        {/* ACTIONS */}
        <div className="mt-3 d-flex gap-2">
          <button className="btn btn-primary" type="submit">
            Save Purchase
          </button>
          <button className="btn btn-outline-secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default PurchasesForm;