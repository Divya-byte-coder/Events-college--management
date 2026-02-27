import React from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-wrapper">
      <Sidebar />
      <div className="admin-content">
        <h2>Admin Dashboard</h2>
        <div className="cards">
          <div className="card" onClick={() => navigate("/admin/events")}>
            <h3>Total Events</h3>
            <p>12</p>
          </div>
          <div className="card" onClick={() => navigate("/admin/registrations")}>
            <h3>Total Registrations</h3>
            <p>340</p>
          </div>
          <div className="card">
            <h3>Total Revenue</h3>
            <p>₹45,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
