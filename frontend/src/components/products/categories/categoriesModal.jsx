import CategoriesForm from "./categoriesForm";

function CategoriesModal({ onSave, onCancel, category }) {
  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content p-4 border border-primary shadow">
          <CategoriesForm
            onSave={onSave}
            onCancel={onCancel}
            category={category}
          />
        </div>
      </div>
    </div>
  );
}

export default CategoriesModal;
