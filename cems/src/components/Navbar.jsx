import React from "react"; // ← MUST import React
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = React.useState(
    localStorage.getItem("darkMode") === "true"
  );

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.body.classList.toggle("dark", newMode);
  };

  React.useEffect(() => {
    // Apply persisted mode on load
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const logout = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">CEMS</h2>

      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/profile">Profile</Link>
        <button className="dark-toggle-btn" onClick={toggleDarkMode}>
          {darkMode ? "🌙" : "☀️"}
        </button>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();

//   const logout = () => {
//     navigate("/");
//   };

//   return (
//     <nav className="navbar">
//       <h2 className="logo">CEMS</h2>

//       <div className="nav-links">
//         <Link to="/home">Home</Link>
//         <Link to="/profile">Profile</Link>
//         <button className="logout-btn" onClick={logout}>
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
