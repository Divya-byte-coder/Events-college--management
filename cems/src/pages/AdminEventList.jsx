import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";

function AdminManageEvents() {
  const [events, setEvents] = useState([]);
  const [toast, setToast] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    fee: 0,
    createdBy: "admin@example.com",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/events");
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      setToast({ message: "Failed to load events", type: "error" });
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ CREATE EVENT
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/events/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setToast({ message: "Event Created Successfully!", type: "success" });
      setForm({
        title: "",
        description: "",
        date: "",
        fee: 0,
        createdBy: "admin@example.com",
      });

      fetchEvents();
    } catch (err) {
      setToast({ message: err.message, type: "error" });
    }
  };

  // ✅ DELETE EVENT
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/events/delete/${id}`, {
        method: "DELETE",
      });

      setToast({ message: "Event Deleted", type: "success" });
      fetchEvents();
    } catch (err) {
      setToast({ message: "Delete failed", type: "error" });
    }
  };

  // ✅ UPDATE EVENT
  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/events/update/${selectedEvent._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedEvent),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setToast({ message: "Event Updated!", type: "success" });
      setSelectedEvent(null);
      fetchEvents();
    } catch (err) {
      setToast({ message: err.message, type: "error" });
    }
  };

  return (
    <div className="admin-wrapper">
      <Sidebar />

      <div className="admin-content">
        <h2>Manage Events 🎉</h2>

        {/* ================= CREATE EVENT ================= */}
        <form className="event-form" onSubmit={handleCreate}>
          <h3>Create Event</h3>

          <input
            name="title"
            placeholder="Event Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="fee"
            value={form.fee}
            onChange={handleChange}
            placeholder="Fee"
          />

          <button type="submit" className="btn btn-primary">
            Create Event
          </button>
        </form>

        {/* ================= EVENT LIST ================= */}
        <h3 style={{ marginTop: "40px" }}>Created Events</h3>

        <table className="registrations-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Fee</th>
              <th>Registered</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.length === 0 && (
              <tr>
                <td colSpan="5">No events created yet</td>
              </tr>
            )}

            {events.map((event) => (
              <tr key={event._id}>
                <td>{event.title}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.fee === 0 ? "Free" : `₹${event.fee}`}</td>
                <td>{event.registeredCount || 0}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => setSelectedEvent(event)}
                  >
                    View / Edit
                  </button>

                  <button
                    className="cancel-btn"
                    onClick={() => handleDelete(event._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ================= EDIT MODAL ================= */}
        {selectedEvent && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3>Event Details</h3>

              <input
                value={selectedEvent.title}
                onChange={(e) =>
                  setSelectedEvent({
                    ...selectedEvent,
                    title: e.target.value,
                  })
                }
              />

              <textarea
                value={selectedEvent.description}
                onChange={(e) =>
                  setSelectedEvent({
                    ...selectedEvent,
                    description: e.target.value,
                  })
                }
              />

              <input
                type="date"
                value={selectedEvent.date?.split("T")[0]}
                onChange={(e) =>
                  setSelectedEvent({
                    ...selectedEvent,
                    date: e.target.value,
                  })
                }
              />

              <input
                type="number"
                value={selectedEvent.fee}
                onChange={(e) =>
                  setSelectedEvent({
                    ...selectedEvent,
                    fee: e.target.value,
                  })
                }
              />

              <p>
                <strong>Registered Students:</strong>{" "}
                {selectedEvent.registeredCount || 0}
              </p>

              <button onClick={handleUpdate} className="btn btn-primary">
                Update
              </button>

              <button
                onClick={() => setSelectedEvent(null)}
                className="cancel-btn"
              >
                Close
              </button>
            </div>
          </div>
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

export default AdminManageEvents;
// import { useState } from "react";
// import "../styles/adminEvent.css"; // We'll create this CSS

// function AdminCreateEvent() {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     date: "",
//     createdBy: "admin@example.com", // dynamically fetch admin email if needed
//   });
//   const [file, setFile] = useState(null);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
//   const handleFileChange = (e) => setFile(e.target.files[0]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     Object.keys(form).forEach(key => formData.append(key, form[key]));
//     if (file) formData.append("file", file);

//     try {
//       const res = await fetch("http://localhost:5000/api/events/create", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Failed to create event");
//       alert("Event created successfully!");
//       setForm({ title: "", description: "", date: "", createdBy: form.createdBy });
//       setFile(null);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div className="create-event-page">
//       <h2>Create Event</h2>
//       <form onSubmit={handleSubmit} className="event-form">
//         <input
//           name="title"
//           placeholder="Event Title"
//           value={form.title}
//           onChange={handleChange}
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleChange}
//         />
//         <input
//           type="date"
//           name="date"
//           value={form.date}
//           onChange={handleChange}
//           required
//         />
//         <input type="file" onChange={handleFileChange} />
//         <button type="submit">Create Event</button>
//       </form>
//     </div>
//   );
// }

// export default AdminCreateEvent;