import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";
import "../styles/adminManageEvents.css";

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [toast, setToast] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/events");
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch {
      setToast({ message: "Failed to load events", type: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    await fetch(`http://localhost:5000/api/events/${id}`, {
      method: "DELETE",
    });

    setToast({ message: "Event deleted", type: "success" });
    fetchEvents();
  };

  const handleUpdate = async () => {
    await fetch(
      `http://localhost:5000/api/events/${editingEvent._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingEvent),
      }
    );

    setEditingEvent(null);
    fetchEvents();
  };

  return (
    <div className="admin-wrapper">
      <Sidebar />
      <div className="admin-content">
        <h2>Manage Events 🎉</h2>

        <div className="events-grid">
          {events.length === 0 && <p>No events found</p>}

          {events.map((event) => (
            <div className="event-card" key={event._id}>
              {event.filename && (
                <img
                  src={`http://localhost:5000/uploads/${event.filename}`}
                  alt={event.title}
                />
              )}

              <h3>{event.title}</h3>
              <p>{new Date(event.date).toLocaleDateString()}</p>
              <p>{event.fee === 0 ? "Free" : `₹${event.fee}`}</p>

              <div className="card-actions">
                <button onClick={() => setEditingEvent(event)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(event._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {editingEvent && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3>Edit Event</h3>

              <input
                value={editingEvent.title}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    title: e.target.value,
                  })
                }
              />

              <input
                type="date"
                value={editingEvent.date?.split("T")[0]}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    date: e.target.value,
                  })
                }
              />

              <input
                type="number"
                value={editingEvent.fee}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    fee: e.target.value,
                  })
                }
              />

              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditingEvent(null)}>
                Cancel
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

export default AdminEvents;