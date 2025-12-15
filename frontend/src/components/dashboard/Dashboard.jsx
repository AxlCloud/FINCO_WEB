import React from "react";
import TrabajadoresList from "../trabajadores/TrabajadoresList.jsx";

function Dashboard() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Menú vertical */}
        <div className="col-2 bg-light vh-100 p-3 border-end">
          <h4>Menú</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a href="#" className="nav-link active">Trabajadores</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Otra sección</a>
            </li>
          </ul>
        </div>

        {/* Contenido principal */}
        <div className="col-10 p-4">
          <TrabajadoresList />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
