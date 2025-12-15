import { useState } from "react";






function TrabajadoresForm({onSave, onCancel}) {
    const [nombre, setNombre] = useState("");
    const [cedula, setCedula] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [fincaID, setFincaID] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const Trabajador ={
            nombre,
            cedula,
            telefono,
            direccion,
            fincaID
        };
        onSave(Trabajador);
};
    return (
        
        <form onSubmit={handleSubmit} >
            <h3 className="mb-3">Crear Trabajador</h3>
            <div className="mb.2">
                <label className="form-label">Nombre:</label> <br />
                <input className="form-control" value= {nombre} onChange={(e) => setNombre (e.target.value)} required />
            </div>
             <div className="mb.2">
                <label className="form-label">Cedula:</label> <br />
                <input className= "form-control" value= {cedula} onChange={(e) => setCedula (e.target.value)} required />
            </div>
             <div className="mb.2">
                <label className="form-label"> Telefono:</label> <br />
                <input className= "form-control" value= {telefono} onChange={(e) => setTelefono (e.target.value)} required />
            </div>
             <div className="mb.2">
                <label className="form-label">Direccion:</label> <br />
                <input className= "form-control" value= {direccion} onChange={(e) => setDireccion (e.target.value)} required />
            </div>

            <div className="mb.2">
                <label className="form-label">Finca ID:</label> <br />
                <input className="form-control" type = "number" value= {fincaID} onChange={(e) => setFincaID (e.target.value)} required />
            </div>
            <div className="d-flex justify-content-end gap-2 mt-3 ">
             <button type="submit" className="btn btn-success px-4">Guardar</button>
             <button type="button"  className="btn btn-secondary px-4" onClick={onCancel}>Cancelar</button>
            
            </div>
           
             </form>
    );
}
export default TrabajadoresForm;

