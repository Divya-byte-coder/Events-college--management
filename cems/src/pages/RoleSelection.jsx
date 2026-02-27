import { useNavigate } from "react-router-dom";
import "../styles/animations.css";
import "../styles/global.css";

function RoleSelection() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    // Pass role in query to login page
    navigate(`/login?role=${role}`);
  };

  return (
    <div className="role-page">
      <div className="role-container fade-in">
        <h1 className="role-title">College Event Management System</h1>
        <p className="role-subtitle">
          Manage and Explore College Events Seamlessly
        </p>

        <div className="role-cards">
          <div
            className="role-card scale-hover"
            onClick={() => handleRoleSelect("student")}
          >
            <div className="role-icon">🎓</div>
            <h2>Student</h2>
            <p>Browse & Register for Events</p>
          </div>

          <div
            className="role-card scale-hover"
            onClick={() => handleRoleSelect("admin")}
          >
            <div className="role-icon">🛠</div>
            <h2>Admin</h2>
            <p>Manage Events & Registrations</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;
