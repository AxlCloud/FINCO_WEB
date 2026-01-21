import PartnersModal from "./partnersModal";
import { useState, useEffect } from "react";

function PartnersList() {
    const [partners,setPartners] = useState([]);
    const [showModal,setShowModal] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState(null);


    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const res = await fetch("http://localhost:3000/partners")
                const data = await res.json();
                setPartners(data);
            } catch (error) {
                console.error("Error Fetching Partners: ", error)
                
            }
        };
        fetchPartners();
    },[]);

    const handleSave = async (partnerData) => {
    try {
        if (selectedPartner) {
            const res = await fetch(
                `http://localhost:3000/partners/${selectedPartner.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(partnerData),
                }
            );

            if (!res.ok) throw new Error("Update failed");

            const updatedPartner = await res.json();
            setPartners(prev =>
                prev.map(p =>
                    p.id === updatedPartner.id ? updatedPartner : p
                )
            );
        } else {
            const res = await fetch("http://localhost:3000/partners", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(partnerData),
            });

            if (!res.ok) throw new Error("Create failed");

            const newPartner = await res.json();
            setPartners(prev => [...prev, newPartner]);
        }

        setShowModal(false);
        setSelectedPartner(null);
    } catch (error) {
        console.error("Error saving partner:", error);
        alert("Error saving partner, try again.");
    }
};

   const handleEdit = (partner) =>{
    setSelectedPartner(partner);
    setShowModal(true);
   }


   const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this partner?")) return;
    try {
        await fetch(`http://localhost:3000/partners/${id}`,{
            method:"DELETE"
        });
        setPartners(prev => prev.filter((part) => part.id !== id));
    } catch (error) {
        console.error("Error deleting partner: ", error);
        alert("Error deleting employee, try again")
    }
   };
   return(
    <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="text-primary">Partners</h2>
            <button className="btn btn-success" onClick={() => {setSelectedPartner(null);
                setShowModal(true);
            }}>
            + Add Partner
            </button>
        </div>

            <div className="table-responsive shadow-sm rounded">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Person Type</th>
                            <th>Partner Type</th>
                            <th>Name</th>
                            <th>Document/NIT</th>
                            <th>CV</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                <tbody>
                    {partners.length === 0 ?(
                        <tr>
                            <td colSpan="11" className="text-center py-3">
                                No partners found
                            </td>
                        </tr>
                    ):(
                        partners.map((part) => (
                            <tr key={part.id}>
                                <td>{part.id}</td>
                                <td>
                                    <span className={`badge ${part.person_type === "INDIVIDUAL" ? "bg-primary" : "bg-dark" }`} >
                                        {part.person_type}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge ${
                                        part.partner_type === "CUSTOMER"
                                            ? "bg-info"
                                            : part.partner_type === "SUPPLIER"
                                            ? "bg-warning text-dark"
                                            : "bg-success"
                                        }`}>
                                        {part.partner_type}            
                                    </span>
                                </td>
                                <td>{part.name}</td>
                                <td>{part.document_number}</td>
                                <td>
                                {part.person_type === "COMPANY" ? part.verification_digit : "-"}
                                </td>
                                <td>{part.email}</td>
                                <td>{part.phone}</td>
                                <td>{part.address}</td>
                                <td>
                                    <span className={`badge ${part.status === "ACTIVE" ? "bg-success" : "bg-secondary" }`}>
                                        {part.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(part)}> Edit </button>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(part.id)}>Delete</button>
                                </td>
                            </tr>
                         ))
                    )}
                </tbody>
                </table>
            </div>
            {showModal && (<PartnersModal 
                onCancel ={() => setShowModal(false)}
                onSave ={handleSave}
                partner={selectedPartner}
                
                />
                )}
    </div>
   )
   }
   export default PartnersList;
   