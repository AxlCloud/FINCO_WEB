import React, { useState } from 'react';
import TrabajadoresModal from './TrabajadoresModal.jsx';

function TrabajadoresList() {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [trabajadores, setTrabajadores] = useState([]);
    const [trabajadoresEditar, setTrabajadoresEditar] = useState(null);

    const guardarTrabajador = (nuevoTrabajador) => {
        if (trabajadoresEditar) {
            // Editar trabajador existente
            setTrabajadores(
                trabajadores.map((t) =>
                    t.id === trabajadoresEditar.id ? { ...t, ...nuevoTrabajador } : t
                )
            );
            setTrabajadoresEditar(null);
        } else {
            // Agregar nuevo trabajador
            setTrabajadores([...trabajadores, { id: trabajadores.length + 1, ...nuevoTrabajador }]);
        }
        setMostrarModal(false);
    };

    const editarTrabajador = (trabajador) => {
        setTrabajadoresEditar(trabajador);
        setMostrarModal(true);
    };

    const eliminarTrabajador = (id) => {
        setTrabajadores(trabajadores.filter((t) => t.id !== id));
    };

    return (
        <div className ="container mt-4">
            <div className='row justify-content-center'>
                <div className='col-12 col-md-10 con-lg-8'>
                    
                    <h2>Trabajadores</h2>
                    <button className="btn btn-success mb-2" onClick={() => setMostrarModal(true)}>Crear Trabajador</button>

                    {mostrarModal && (
                        <TrabajadoresModal
                            trabajador={trabajadoresEditar}
                            onClose={() => {
                                setMostrarModal(false);
                                setTrabajadoresEditar(null);
                            }}
                            onSave={guardarTrabajador}
                        />
                    )}

                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Cedula</th>
                                <th>Telefono</th>
                                <th>Direccion</th>
                                <th>Finca ID</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trabajadores.map((trabajador) => (
                                <tr key={trabajador.id}>
                                    <td>{trabajador.id}</td>
                                    <td>{trabajador.nombre}</td>
                                    <td>{trabajador.cedula}</td>
                                    <td>{trabajador.telefono}</td>
                                    <td>{trabajador.direccion}</td>
                                    <td>{trabajador.fincaID}</td>
                                    <td>
                                        <button className="btn btn-primary btn-sm" onClick={() => editarTrabajador(trabajador)}>Editar</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => eliminarTrabajador(trabajador.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default TrabajadoresList;
