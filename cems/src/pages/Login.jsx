import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Toast from "../components/Toast";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role") || "student";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setToast({ message: "Please fill all fields!", type: "error" });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role })
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setToast({ message: data.message || "Login failed", type: "error" });
        return;
      }

      // Store token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToast({ message: "Login successful!", type: "success" });
      setTimeout(() => navigate(role === "admin" ? "/admin" : "/home"), 1200);

    } catch (err) {
      setLoading(false);
      setToast({ message: "Server error", type: "error" });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card fade-in">
        <h2>{role === "admin" ? "Admin Login" : "Student Login"}</h2>

        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} />
          <button type="submit" className="btn btn-primary">{loading ? "Logging in..." : "Login"}</button>
        </form>

        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate(`/signup?role=${role}`)} className="link">Sign Up</span>
        </p>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default Login;// import { useNavigate, useLocation } from "react-router-dom";
// import { useState } from "react";
// import Toast from "../components/Toast";

// function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const queryParams = new URLSearchParams(location.search);
//   const role = queryParams.get("role") || "student";

//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   const [toast, setToast] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.email || !formData.password) {
//       setToast({
//         message: "Please fill all fields!",
//         type: "error"
//       });
//       return;
//     }

//     setLoading(true);

//     // Simulate authentication delay
//     setTimeout(() => {
//       setLoading(false);

//       setToast({
//         message:
//           role === "admin"
//             ? "Admin Login Successful!"
//             : "Student Login Successful!",
//         type: "success"
//       });

//       // Redirect after short delay
//       setTimeout(() => {
//         if (role === "admin") {
//           navigate("/admin");
//         } else {
//           navigate("/home");
//         }
//       }, 1500);

//     }, 1200);
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-card fade-in">
//         <h2>{role === "admin" ? "Admin Login" : "Student Login"}</h2>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter Email"
//             value={formData.email}
//             onChange={handleChange}
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Enter Password"
//             value={formData.password}
//             onChange={handleChange}
//           />

//           <button type="submit" className="btn btn-primary">
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p>
//           Don't have an account?{" "}
//           <span
//             className="link"
//             onClick={() => navigate(`/signup?role=${role}`)}
//           >
//             Sign Up
//           </span>
//         </p>
//       </div>

//       {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}
//     </div>
//   );
// }

// export default Login;
