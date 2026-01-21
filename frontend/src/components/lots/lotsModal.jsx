import LotsForm from "./lotsForm";

function LotsModal({ onSave, onCancel, lot, farmId }) {
  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content p-4 shadow">
          <LotsForm
            onSave={onSave}
            onCancel={onCancel}
            lot={lot}
            farmId={farmId}
          />
        </div>
      </div>
    </div>
  );
}

export default LotsModal;
