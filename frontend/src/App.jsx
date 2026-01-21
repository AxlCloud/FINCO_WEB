import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./components/layouts/AdminLayout";
import AdminDashboard from "./components/layouts/AdminDashboard";
import SalesPage from "./components/sales/SalesPage";
import PurchasesPage from "./components/purchases/PurchasesPage";
import ExpensesPage from "./components/expenses/ExpensesPage";
import LaborsPage from "./components/labors/LaborsPage";
import CollectionPage from "./components/collection/CollectionPage";
import ReportsPage from "./components/reports/ReportsPage";
import ProductsPage from "./components/products/ProductsPage";
import FarmsPage from "./components/farms/FarmsPage";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
      <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
      <Route path="/admin/products" element={<AdminLayout><ProductsPage /></AdminLayout>} />
      <Route path="/admin/farms" element={<AdminLayout><FarmsPage /></AdminLayout>} />
      <Route path="/admin/sales" element={<AdminLayout><SalesPage /></AdminLayout>} />
      <Route path="/admin/purchases" element={<AdminLayout><PurchasesPage /></AdminLayout>} />
      <Route path="/admin/expenses" element={<AdminLayout><ExpensesPage /></AdminLayout>} />
      <Route path="/admin/labors" element={<AdminLayout><LaborsPage /></AdminLayout>} />
      <Route path="/admin/collection" element={<AdminLayout><CollectionPage /></AdminLayout>} />
      <Route path="/admin/reports" element={<AdminLayout><ReportsPage /></AdminLayout>} />
    </Routes>
  );
}

export default App;
