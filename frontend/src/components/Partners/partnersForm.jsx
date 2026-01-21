import { useState } from "react";
import React from "react";

const Position_Partner = [
    "CUSTOMER",
    "SUPPLIER",
    "BOTH"
];

const Position_Person = [
    "INDIVIDUAL",
    "COMPANY"
]
const Position_status = [
    "ACTIVE",
    "INACTIVE"
]

function PartnersForm({onSave,onCancel,partner}) {
    const [partner_type, setPartnerType] = useState(partner?.partner_type||"");
    const [person_type, setPersonType] = useState(partner?.person_type||"");
    const [name, setName] = useState(partner?.name||"");
    const [document_number,setDocumentNumber] = useState(partner?.document_number||"");
    const [verification_digit,setVerificationDigit] = useState(partner?.verification_digit||"");
    const [email,setEmail] = useState(partner?.email||"");
    const [phone,setPhone] = useState(partner?.phone||"");
    const [address,setAddress] = useState(partner?.address||"");
    const [status,setStatus] = useState(partner?.status||"");

const handleSubmit = (e) =>{
    e.preventDefault();

    const partner = {
        partner_type,
        person_type,
        name,
        document_number,
        verification_digit,
        email,
        phone,
        address,
        status
    }
    onSave(partner);
};

return (
    <div className="container-form">
        <form onSubmit={handleSubmit}>
            <h3 className="mb-3">Add Partner</h3>
            
            <div className="mb-2">
                <label className="form-label">Partnert Type</label>
                <select className="form-select" value={partner_type} onChange={(e) => setPartnerType(e.target.value) } required >
                <option value="">-Select-Type-</option>
                {Position_Partner.map(p => (
                    <option key={p} value={p}>{p}</option>
                ))}
                </select>
            </div>
            <div className="mb-2">
                <label className="form-label">Person Type</label>
                <select className="form-select" value={person_type} onChange={(e) => setPersonType(e.target.value) } required >
                <option value="">-Select Person-</option>
                 {Position_Person.map(p => (
                    <option key={p} value={p}>{p}</option>
                ))}
                </select>
            </div>
            <div className="mb-2">
                <label className="form-label">Name</label>
                <input className="form-control" value={name} onChange={(e) => setName(e.target.value) } required />
            </div>

            <div className="mb-2">
                <label className="form-label">Document / NIT</label>

                <div style={{ display: 'flex', gap: '10px' }}>
                    
                    {/* Documento - 80% */}
                    <div style={{ flex: 8 }}>
                    <input
                        className="form-control"
                        value={document_number}
                        onChange={(e) => setDocumentNumber(e.target.value)}
                        required
                    />
                    </div>

                    {/* DV - 20% */}
                    <div style={{ flex: 2 }}>
                    <input
                        
                        className="form-control"
                        value={verification_digit}
                        onChange={(e) => setVerificationDigit(e.target.value)}
                        required
                    />
                    </div>

                </div>
                </div>

            <div className="mb-2">
                <label className="form-label">Email</label>
                <input className="form-control" value={email} onChange={(e) =>setEmail(e.target.value) } required />
            </div>
            <div className="mb-2">
                <label className="form-label">Phone</label>
                <input className="form-control" value={phone} onChange={(e) =>setPhone(e.target.value) } required />
            </div>
            <div className="mb-2">
                <label className="form-label">Address</label>
                <input className="form-control" value={address} onChange={(e) =>setAddress(e.target.value) } required />
            </div>
            <div className="mb-2">
                <label className="form-label">Status</label>
                <select className="form-select" alue={status} onChange={(e) => setStatus(e.target.value) } required >
                <option value="">-Select Status-</option> 
                 {Position_status.map(p => (
                    <option key={p} value={p}>{p}</option>
                    
                ))}
                </select>
            </div>
            <div className="d-flex justify_content-end gap-2 mt-3">
                <button className="btn btn-success" type="submit">Save</button>
                <button className="btn btn-secondary" type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>

    </div>

);
};

export default PartnersForm;