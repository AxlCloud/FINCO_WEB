import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="d-flex flex-column bg-dark text-white p-3"
      style={{ width: "100px", height: "100vh", position: "fixed" }}
    >
      <div className="text-center mb-4">
        <i className="bi bi-building fs-2 me-2"></i>
        <div className="fw-bold">FINCO</div>
      </div>

      <div className="text-center mb-4">
        <Link to="/admin" className="text-white">
          <i className="bi bi-speedometer2 fs-4 d-block"></i>
          <small>Dashboard</small>
        </Link>
      </div>

      <div className="text-center mb-4">
        <Link to="/admin/products" className="text-white">
          <i className="bi bi-box-seam fs-4 d-block"></i>
          <small>Products</small>
        </Link>
      </div>

      <div className="text-center mb-4">
        <Link to="/admin/farms" className="text-white">
          <i className="bi bi-tree fs-4 d-block"></i>
          <small>Farms</small>
        </Link>
      </div>

      <div className="text-center mb-4">
        <Link to="/admin/sales" className="text-white">
          <i className="bi bi-receipt fs-4 d-block"></i>
          <small>Sales</small>
        </Link>
      </div>

      <div className="text-center mb-4">
        <Link to="/admin/purchases" className="text-white">
          <i className="bi bi-cart-plus fs-4 d-block"></i>
          <small>Purchases</small>
        </Link>
      </div>

      <div className="text-center mb-4">
        <Link to="/admin/expenses" className="text-white">
          <i className="bi bi-wallet fs-4 d-block"></i>
          <small>Expenses</small>
        </Link>
      </div>

      <div className="text-center mb-4">
        <Link to="/admin/labors" className="text-white">
          <i className="bi bi-tools fs-4 d-block"></i>
          <small>Labors</small>
        </Link>
      </div>

      <div className="text-center">
        <Link to="/admin/collection" className="text-white">
          <i className="bi bi-tree-fill fs-4 d-block"></i>
          <small>Collection</small>
        </Link>
      </div>

      <div className="text-center mt-4">
        <Link to="/admin/reports" className="text-white">
          <i className="bi bi-bar-chart fs-4 d-block"></i>
          <small>Reports</small>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
