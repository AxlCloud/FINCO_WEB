import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-people fs-1 text-primary mb-2"></i>
              <h6 className="text-muted">Partners</h6>
              <h3>12</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-box-seam fs-1 text-success mb-2"></i>
              <h6 className="text-muted">Products</h6>
              <h3>34</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-tree fs-1 text-warning mb-2"></i>
              <h6 className="text-muted">Farms</h6>
              <h3>5</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-grid fs-1 text-info mb-2"></i>
              <h6 className="text-muted">Lots</h6>
              <h3>18</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Production and Sales */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header">
              <h5>Production</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Kilos Collected</span>
                <span className="badge bg-success">1,250 kg</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Cereza</span>
                <span className="badge bg-warning">500 kg</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Pergamino Seco</span>
                <span className="badge bg-info">400 kg</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Corriente</span>
                <span className="badge bg-secondary">250 kg</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span>Pasilla</span>
                <span className="badge bg-dark">100 kg</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header">
              <h5>Sales by Type</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Cereza</span>
                <span className="badge bg-success">300 kg</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Pergamino Seco</span>
                <span className="badge bg-warning">250 kg</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Corriente</span>
                <span className="badge bg-info">150 kg</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Pasilla</span>
                <span className="badge bg-secondary">50 kg</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span>Total Sold</span>
                <span className="badge bg-primary">750 kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="row g-3">
        <div className="col-md-12">
          <div className="card shadow-sm">
            <div className="card-header">
              <h5>Quick Access</h5>
            </div>
            <div className="card-body">
              <div className="row g-2">
                <div className="col-md-2">
                  <Link to="/admin/sales" className="btn btn-outline-primary w-100">
                    <i className="bi bi-receipt"></i> New Sale
                  </Link>
                </div>
                <div className="col-md-2">
                  <Link to="/admin/purchases" className="btn btn-outline-success w-100">
                    <i className="bi bi-cart-plus"></i> New Purchase
                  </Link>
                </div>
                <div className="col-md-2">
                  <Link to="/admin/expenses" className="btn btn-outline-warning w-100">
                    <i className="bi bi-wallet"></i> New Expense
                  </Link>
                </div>
                <div className="col-md-2">
                  <Link to="/admin/products" className="btn btn-outline-info w-100">
                    <i className="bi bi-box-seam"></i> Add Product
                  </Link>
                </div>
                <div className="col-md-2">
                  <Link to="/admin/partners" className="btn btn-outline-secondary w-100">
                    <i className="bi bi-people"></i> Add Partner
                  </Link>
                </div>
                <div className="col-md-2">
                  <Link to="/admin/farms" className="btn btn-outline-dark w-100">
                    <i className="bi bi-tree"></i> Add Farm
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
