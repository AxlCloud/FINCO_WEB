import React, { useState } from "react";
import CollectionList from "./CollectionList";
import CollectionForm from "./CollectionForm";
import CollectionSummary from "./CollectionSummary";

function CollectionPage() {
  const [view, setView] = useState("list");
  const [selectedCollection, setSelectedCollection] = useState(null);

  const handleCreate = () => {
    setSelectedCollection(null);
    setView("form");
  };

  const handleView = (collection) => {
    setSelectedCollection(collection);
    setView("form");
  };

  const handleEdit = () => {
    setView("form");
  };

  const handleSave = (data) => {
    if (Array.isArray(data)) {
      // Guardar semana completa
      console.log("Guardar semana de recolecciones", data);
      // Aquí luego fetch POST batch o algo
      setSelectedCollection(data);
      setView("summary");
    } else {
      // Single collection (por si acaso)
      console.log("Guardar colección", data);
      setSelectedCollection(data);
      setView("summary");
    }
  };

  return (
    <>
      {view === "list" && (
        <CollectionList
          onCreate={handleCreate}
          onView={handleView}
        />
      )}

      {view === "form" && (
        <CollectionForm
          collection={selectedCollection}
          onSave={handleSave}
          onCancel={() => setView("list")}
        />
      )}

      {view === "summary" && (
        <CollectionSummary
          collection={selectedCollection}
          onEdit={handleEdit}
          onClose={() => setView("list")}
        />
      )}
    </>
  );
}

export default CollectionPage;