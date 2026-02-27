import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Toast from "../components/Toast";

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role") || "student";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setToast({ message: "Passwords do not match", type: "error" });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role })
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setToast({ message: data.message || "Signup failed", type: "error" });
        return;
      }

      setToast({ message: "Signup successful! Redirecting to login...", type: "success" });
      setTimeout(() => navigate(`/login?role=${role}`), 1500);

    } catch (err) {
      setLoading(false);
      setToast({ message: "Server error", type: "error" });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card fade-in">
        <h2>{role === "admin" ? "Admin Signup" : "Student Signup"}</h2>

        <form onSubmit={handleSignup}>
          <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />

          <button type="submit" className="btn btn-primary">
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <span onClick={() => navigate(`/login?role=${role}`)} className="link">
            Login
          </span>
        </p>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default Signup;// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// function Signup() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSignup = (e) => {
//     e.preventDefault();

//     if (form.password !== form.confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     alert("Signup successful!");
//     navigate("/login");
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-card fade-in">
//         <h2>Create Account</h2>

//         <form onSubmit={handleSignup}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             value={form.confirmPassword}
//             onChange={handleChange}
//             required
//           />

//           <button className="btn btn-primary">Sign Up</button>
//         </form>

//         <p>
//           Already have an account?{" "}
//           <span onClick={() => navigate("/login")} className="link">
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;
