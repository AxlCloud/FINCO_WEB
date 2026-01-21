import React, { useState } from "react";
import PurchasesList from "./PurchasesList";
import PurchasesForm from "./PurchasesForm";
import PurchasesSummary from "./PurchasesSummary";

function PurchasesPage() {
  const [view, setView] = useState("list");
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  const handleCreate = () => {
    setSelectedPurchase(null);
    setView("form");
  };

  const handleView = (purchase) => {
    setSelectedPurchase(purchase);
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
    console.log("Guardar compra", data);
    // aquí luego haces el fetch POST o PUT
    setSelectedPurchase(data);
    setView("summary");
  };

  return (
    <>
      {view === "list" && (
        <PurchasesList
          onCreate={handleCreate}
          onView={handleView}
        />
      )}

      {view === "form" && (
        <PurchasesForm
          purchase={selectedPurchase}
          onSave={handleSave}
          onCancel={() => setView("list")}
        />
      )}

      {view === "summary" && (
        <PurchasesSummary
          purchase={selectedPurchase}
          onEdit={handleEdit}
          onCreditNote={handleCreditNote}
          onDebitNote={handleDebitNote}
          onClose={() => setView("list")}
        />
      )}
    </>
  );
}

export default PurchasesPage;