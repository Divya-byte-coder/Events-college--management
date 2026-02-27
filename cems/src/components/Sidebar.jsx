import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/"); // redirect to homepage/login
  };

  return (
    <div className="sidebar">
      <h2>CEMS Admin</h2>
      <ul>
        <li><Link to="/admin">Dashboard</Link></li>
        <li>
  <Link to="/admin/events">Events</Link>
</li>
        <li><Link to="/admin/events">Manage Events</Link></li>
        <li><Link to="/admin/registrations">Registrations</Link></li>

        <li><button onClick={logout}>Logout</button></li>
      </ul>
    </div>
  );
}

export default Sidebar;

