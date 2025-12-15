import TrabajadoresForm from "./TrabajadoresForm";
import React from "react";

function TrabajadoresModal({onClose, onSave}) {
    return (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0,5)'}}>
            <div className="modal-content p-4 border border-primary shadow">
                <TrabajadoresForm onSave={onSave} onCancel={onClose} />
            </div>
        </div>
    );
    
}
export default TrabajadoresModal;

