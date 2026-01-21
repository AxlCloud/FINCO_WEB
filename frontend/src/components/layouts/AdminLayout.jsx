import React from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Topbar from "./Topbar";

function AdminLayout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />
      
      <div className="flex-grow-1 d-flex flex-column" style={{ marginLeft: "100px", minHeight: "100vh"  }}>
        <Topbar />

      <main className="flex-grow-1 p-4 bg-light">
        {children}
      </main>
       <Footer />
    </div>
     
    </div>  
  );
}

export default AdminLayout;
