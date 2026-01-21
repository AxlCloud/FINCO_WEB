import React, { useState } from "react";
import LaborsList from "./LaborsList";
import LaborsForm from "./LaborsForm";
import LaborsSummary from "./LaborsSummary";

function LaborsPage() {
  const [view, setView] = useState("list");
  const [selectedLabor, setSelectedLabor] = useState(null);

  const handleCreate = () => {
    setSelectedLabor(null);
    setView("form");
  };

  const handleView = (labor) => {
    setSelectedLabor(labor);
    setView("form");
  };

  const handleEdit = () => {
    setView("form");
  };

  const handleSave = (data) => {
    if (Array.isArray(data)) {
      // Guardar semana completa
      console.log("Guardar semana de labores", data);
      // Aquí luego fetch POST batch
      setSelectedLabor(data);
      setView("summary");
    } else {
      // Single labor (por si acaso)
      console.log("Guardar labor", data);
      setSelectedLabor(data);
      setView("summary");
    }
  };

  return (
    <>
      {view === "list" && (
        <LaborsList
          onCreate={handleCreate}
          onView={handleView}
        />
      )}

      {view === "form" && (
        <LaborsForm
          labor={selectedLabor}
          onSave={handleSave}
          onCancel={() => setView("list")}
        />
      )}

      {view === "summary" && (
        <LaborsSummary
          labor={selectedLabor}
          onEdit={handleEdit}
          onClose={() => setView("list")}
        />
      )}
    </>
  );
}

export default LaborsPage;