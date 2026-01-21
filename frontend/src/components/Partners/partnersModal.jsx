import React from "react";
import PartnersForm from "./partnersForm";

function PartnersModal({onCancel, onSave, partner}) {
    return(
        <div className="modal show d-block" style={{backgroundColor:"rgba(0,0,0,0.5)"}}>
            <div className="modal-dialog">
                <div className="modal-content p-4 border border-primary shadow">
                        <PartnersForm onSave={onSave} onCancel={onCancel} partner={partner}/>
                </div>
            </div>

        </div>
    )
    
}
export default PartnersModal;