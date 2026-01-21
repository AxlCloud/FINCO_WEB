import React, { useState } from "react";
import ExpensesList from "./ExpensesList";
import ExpensesForm from "./ExpensesForm";
import ExpensesSummary from "./ExpensesSummary";

function ExpensesPage() {
  const [view, setView] = useState("list");
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleCreate = () => {
    setSelectedExpense(null);
    setView("form");
  };

  const handleView = (expense) => {
    setSelectedExpense(expense);
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
    console.log("Guardar gasto", data);
    // aquí luego haces el fetch POST o PUT
    setSelectedExpense(data);
    setView("summary");
  };

  return (
    <>
      {view === "list" && (
        <ExpensesList
          onCreate={handleCreate}
          onView={handleView}
        />
      )}

      {view === "form" && (
        <ExpensesForm
          expense={selectedExpense}
          onSave={handleSave}
          onCancel={() => setView("list")}
        />
      )}

      {view === "summary" && (
        <ExpensesSummary
          expense={selectedExpense}
          onEdit={handleEdit}
          onCreditNote={handleCreditNote}
          onDebitNote={handleDebitNote}
          onClose={() => setView("list")}
        />
      )}
    </>
  );
}

export default ExpensesPage;