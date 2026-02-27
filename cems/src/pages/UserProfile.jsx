import { useState } from "react";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";

function UserProfile() {
  const [user, setUser] = useState({
    name: "Divi",
    email: "divi@email.com",
    phone: "9876543210",
    college: "ABC Engineering College",
    department: "Computer Science",
  });

  const [editMode, setEditMode] = useState(false);
  const [toast, setToast] = useState(null);

  const [registeredEvents, setRegisteredEvents] = useState([
    { id: 1, title: "Hackathon 2026", date: "March 15, 2026" },
    { id: 2, title: "Cultural Fest", date: "April 2, 2026" },
  ]);

  // Handle form input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Save profile changes
  const handleSave = () => {
    setEditMode(false);
    setToast({ message: "Profile Updated Successfully!", type: "success" });
  };

  // Cancel registration for an event
  const handleCancel = (id) => {
    const updatedEvents = registeredEvents.filter((event) => event.id !== id);
    setRegisteredEvents(updatedEvents);
    setToast({ message: "Registration Cancelled!", type: "error" });
  };

  return (
    <>
      <Navbar />

      <div className="profile-container fade-in">
        <h2>My Profile 👤</h2>

        <div className="profile-card">
          {editMode ? (
            <>
              <input
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Name"
              />
              <input
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                name="phone"
                value={user.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
              <input
                name="college"
                value={user.college}
                onChange={handleChange}
                placeholder="College"
              />
              <input
                name="department"
                value={user.department}
                onChange={handleChange}
                placeholder="Department"
              />

              <button className="btn btn-primary" onClick={handleSave}>
                Save Changes
              </button>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>College:</strong> {user.college}</p>
              <p><strong>Department:</strong> {user.department}</p>

              <button
                className="btn btn-primary"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>

        <h3 className="section-title">Registered Events 🎟</h3>

        <div className="registered-events">
          {registeredEvents.length === 0 && (
            <p>No registered events yet.</p>
          )}

          {registeredEvents.map((event) => (
            <div key={event.id} className="registered-card">
              <h4>{event.title}</h4>
              <p>{event.date}</p>
              <button
                className="cancel-btn"
                onClick={() => handleCancel(event.id)}
              >
                Cancel Registration
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

export default UserProfile;
