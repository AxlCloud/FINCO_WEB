import React, { useState } from "react";
import SalesList from "./SalesList";
import SalesForm from "./SalesForm";
import InvoiceSummary from "./InvoiceSummary";

function SalesPage() {
  const [view, setView] = useState("list");
  const [selectedSale, setSelectedSale] = useState(null);

  const handleCreate = () => {
    setSelectedSale(null);
    setView("form");
  };

  const handleView = (sale) => {
    setSelectedSale(sale);
    setView("form");
  };

  const handleEdit = () => {
    setView("form");
  };

  const handleCreditNote = () => {
    console.log("Nota de crédito");
    // implementar
  };

  const handleDebitNote = () => {
    console.log("Nota de débito");
    // implementar
  };

  const handleSave = (data) => {
    console.log("Guardar venta", data);
    // aquí luego haces el fetch POST o PUT
    setSelectedSale(data);
    setView("summary");
  };

  return (
    <>
      {view === "list" && (
        <SalesList
          onCreate={handleCreate}
          onView={handleView}
        />
      )}

      {view === "form" && (
        <SalesForm
          sale={selectedSale}
          onSave={handleSave}
          onCancel={() => setView("list")}
        />
      )}

      {view === "summary" && (
        <InvoiceSummary
          sale={selectedSale}
          onEdit={handleEdit}
          onCreditNote={handleCreditNote}
          onDebitNote={handleDebitNote}
          onClose={() => setView("list")}
        />
      )}
    </>
  );
}

export default SalesPage;
