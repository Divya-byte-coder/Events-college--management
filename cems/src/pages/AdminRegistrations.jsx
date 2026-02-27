// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Toast from "../components/Toast";

// function AdminRegistrations() {
//   const [registrations, setRegistrations] = useState([
//     {
//       id: 1,
//       event: "Hackathon 2026",
//       name: "Divi",
//       email: "divi@email.com",
//       phone: "9876543210",
//       college: "ABC Engineering College",
//       department: "Computer Science",
//     },
//     {
//       id: 2,
//       event: "Cultural Fest",
//       name: "Amit",
//       email: "amit@email.com",
//       phone: "9876543211",
//       college: "XYZ College",
//       department: "Mechanical",
//     },
//   ]);

//   const [toast, setToast] = useState(null);

//   const handleDelete = (id) => {
//     setRegistrations(registrations.filter((r) => r.id !== id));
//     setToast({ message: "Registration removed!", type: "error" });
//   };

//   const handleDownloadCSV = () => {
//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       ["Event,Name,Email,Phone,College,Department"]
//         .concat(
//           registrations.map(
//             (r) =>
//               `${r.event},${r.name},${r.email},${r.phone},${r.college},${r.department}`
//           )
//         )
//         .join("\n");

//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "registrations.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="admin-wrapper">
//       <Sidebar />
//       <div className="admin-content">
//         <h2>Registrations Management 📝</h2>
//         <button className="btn btn-primary" onClick={handleDownloadCSV}>
//           Download CSV
//         </button>

//         <table className="registrations-table">
//           <thead>
//             <tr>
//               <th>Event</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>College</th>
//               <th>Department</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {registrations.map((r) => (
//               <tr key={r.id}>
//                 <td>{r.event}</td>
//                 <td>{r.name}</td>
//                 <td>{r.email}</td>
//                 <td>{r.phone}</td>
//                 <td>{r.college}</td>
//                 <td>{r.department}</td>
//                 <td>
//                   <button
//                     className="cancel-btn"
//                     onClick={() => handleDelete(r.id)}
//                   >
//                     Remove
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {registrations.length === 0 && <p>No registrations found.</p>}

//         {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
//       </div>
//     </div>
//   );
// }

// export default AdminRegistrations;
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";

function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/events/registrations/all"
      );
      const data = await res.json();

      if (Array.isArray(data)) {
        setRegistrations(data);
      } else {
        setRegistrations([]);
      }
    } catch (err) {
      setToast({ message: "Failed to load registrations", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/api/events/registrations/delete/${id}`,
        { method: "DELETE" }
      );

      setRegistrations((prev) => prev.filter((r) => r._id !== id));

      setToast({ message: "Registration removed!", type: "success" });
    } catch (err) {
      setToast({ message: "Delete failed", type: "error" });
    }
  };

  // ✅ DOWNLOAD CSV FUNCTION
  const handleDownloadCSV = () => {
    if (registrations.length === 0) {
      alert("No registrations to download");
      return;
    }

    const headers = [
      "Event",
      "Name",
      "Email",
      "Phone",
      "College",
      "Department",
    ];

    const rows = registrations.map((r) => [
      r.event?.title,
      r.name,
      r.email,
      r.phone,
      r.college,
      r.department,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "registrations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="admin-wrapper">Loading...</div>;

  return (
    <div className="admin-wrapper">
      <Sidebar />

      <div className="admin-content">
        <h2>Registrations Management 📝</h2>

        <button className="btn btn-primary" onClick={handleDownloadCSV}>
          Download CSV
        </button>

        {registrations.length === 0 ? (
          <p>No registrations yet.</p>
        ) : (
          <table className="registrations-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>College</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <tr key={r._id}>
                  <td>{r.event?.title}</td>
                  <td>{r.name}</td>
                  <td>{r.email}</td>
                  <td>{r.phone}</td>
                  <td>{r.college}</td>
                  <td>{r.department}</td>
                  <td>
                    <button
                      className="cancel-btn"
                      onClick={() => handleDelete(r._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
}

export default AdminRegistrations;