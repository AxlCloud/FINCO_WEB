import React from "react";
import FarmsForm from "./farmsForm";

function FarmModal({onCancel, onSave, farm}) {
    return(
        <div className="modal show d-block" style={{backgroundColor:"rgba(0,0,0,0.5)"}}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content p-4 border border-primary shadow">
                        <FarmsForm onSave={onSave} onCancel={onCancel} farm={farm}/>
                </div>
            </div>

        </div>
    )
    
}
export default FarmModal;