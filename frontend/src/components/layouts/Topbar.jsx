import React, { useState, useEffect } from "react";

function Topbar() {
  const userName = "John Doe"; // Aquí puedes obtener el nombre del usuario logueado
  const farmName = "Finca Ejemplo"; // Aquí puedes obtener el nombre de la finca logueada
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString();
  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom px-4">
      <div className="me-4">
        <span className="fw-bold">Welcome to FINCO, {userName}</span>
      </div>

      <div className="flex-grow-1 me-4">
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search..."
            aria-label="Search"
          />
          <button className="btn btn-outline-primary" type="submit">
            Search
          </button>
        </form>
      </div>

      <div className="d-flex align-items-center gap-3">
        <span>Farm: {farmName}</span>
        <span>{formattedDate} {formattedTime}</span>
        <button className="btn btn-outline-secondary">
          <i className="bi bi-person"></i> Profile
        </button>
        <button className="btn btn-outline-danger">
          <i className="bi bi-box-arrow-right"></i> Logout
        </button>
      </div>
    </nav>
  );
}

export default Topbar;
