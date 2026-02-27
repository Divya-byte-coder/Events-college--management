// import { useState } from "react";
// import "../styles/adminEvent.css";

// function AdminCreateEvent() {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     date: "",
//     createdBy: "admin@example.com", // later replace with logged-in admin
//   });

//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Handle text input change
//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle file change
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("title", form.title);
//     formData.append("description", form.description);
//     formData.append("date", form.date);
//     formData.append("createdBy", form.createdBy);

//     if (file) {
//       formData.append("file", file);
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/events/create", {
//         method: "POST",
//         body: formData,
//       });

//       const text = await res.text(); // safer than res.json()
//       console.log("Server response:", text);

//       let data;
//       try {
//         data = JSON.parse(text);
//       } catch {
//         throw new Error("Server returned invalid response");
//       }

//       if (!res.ok) {
//         throw new Error(data.error || data.message || "Failed to create event");
//       }

//       setMessage("✅ Event created successfully!");
//       setForm({
//         title: "",
//         description: "",
//         date: "",
//         createdBy: form.createdBy,
//       });
//       setFile(null);

//     } catch (err) {
//       console.error("Create Event Error:", err);
//       setMessage("❌ " + err.message);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="create-event-page">
//       <div className="event-card">
//         <h2>Create New Event</h2>

//         {message && <p className="form-message">{message}</p>}

//         <form onSubmit={handleSubmit} className="event-form">
//           <input
//             type="text"
//             name="title"
//             placeholder="Event Title"
//             value={form.title}
//             onChange={handleChange}
//             required
//           />

//           <textarea
//             name="description"
//             placeholder="Event Description"
//             value={form.description}
//             onChange={handleChange}
//           />

//           <input
//             type="date"
//             name="date"
//             value={form.date}
//             onChange={handleChange}
//             required
//           />

//           <input type="file" onChange={handleFileChange} />

//           <button type="submit" disabled={loading}>
//             {loading ? "Creating..." : "Create Event"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AdminCreateEvent;
import { useEffect, useState } from "react";

function AdminEventList() {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    date: "",
  });

  // Fetch events
  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/events");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // DELETE EVENT
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;

    try {
      await fetch(`http://localhost:5000/api/events/delete/${id}`, {
        method: "DELETE",
      });
      fetchEvents();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // EDIT EVENT
  const handleEditClick = (event) => {
    setEditingId(event._id);
    setEditForm({
      title: event.title,
      description: event.description,
      date: event.date.split("T")[0],
    });
  };

  const handleUpdate = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/events/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      setEditingId(null);
      fetchEvents();
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Admin Event Management</h2>

      {events.map((event) => (
        <div
          key={event._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
          }}
        >
          {editingId === event._id ? (
            <>
              <input
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
              />
              <textarea
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
              />
              <input
                type="date"
                value={editForm.date}
                onChange={(e) =>
                  setEditForm({ ...editForm, date: e.target.value })
                }
              />

              <button onClick={() => handleUpdate(event._id)}>
                Save
              </button>
              <button onClick={() => setEditingId(null)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>

              <button onClick={() => handleEditClick(event)}>
                Edit
              </button>
              <button onClick={() => handleDelete(event._id)}>
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminEventList;