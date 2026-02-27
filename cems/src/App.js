import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import EventDetails from "./pages/EventDetails";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminEventList from "./pages/AdminEventList";
import AdminRegistrations from "./pages/AdminRegistrations";
import AdminCreateEvent from "./pages/AdminCreateEvent"; // Added Create Event Page
import AdminEvents from "./pages/AdminEvents";

function App() {
  return (
    <Router>
      <Routes>
        {/* ----------------- Role Selection ----------------- */}
        <Route path="/" element={<RoleSelection />} />

        {/* ----------------- Authentication ----------------- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ----------------- Student Panel ----------------- */}
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/event/:id" element={<EventDetails />} />

        {/* ----------------- Admin Panel ----------------- */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<AdminEventList />} />
        <Route path="/admin/events/create" element={<AdminCreateEvent />} /> {/* New */}
        <Route path="/admin/registrations" element={<AdminRegistrations />} />
        <Route path="/admin/events" element={<AdminEvents />} />
      </Routes>
    </Router>
  );
}

export default App;// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import RoleSelection from "./pages/RoleSelection";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Home from "./pages/Home";
// import UserProfile from "./pages/UserProfile";
// import EventDetails from "./pages/EventDetails";
// import AdminDashboard from "./pages/AdminDashboard";
// import AdminEventList from "./pages/AdminEventList";
// import AdminRegistrations from "./pages/AdminRegistrations";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* First Page */}
//         <Route path="/" element={<RoleSelection />} />

//         Authentication
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Student Panel */}
//         <Route path="/home" element={<Home />} />

//         {/* Admin Panel */}
//         <Route path="/admin" element={<AdminDashboard />} />
//       <Route path="/profile" element={<UserProfile />} />
//       <Route path="/event/:id" element={<EventDetails />} />
//       <Route path="/admin/registrations" element={<AdminRegistrations />} />
//        <Route path="/admin/events" element={<AdminEventList />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
