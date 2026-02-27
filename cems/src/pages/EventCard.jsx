import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";

function StudentEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(data => {
        // Map backend events to your EventCard format
        const mapped = data.map(ev => ({
          id: ev._id,
          title: ev.title,
          image: ev.filename
            ? `http://localhost:5000/uploads/${ev.filename}`
            : "/default-event.jpg", // fallback image
          college: "Your College", // optional if stored in DB
          date: new Date(ev.date).toLocaleDateString(),
          registered: ev.registered || 0, // optional if stored
          department: ev.department || "General", // optional if stored
          free: ev.free || false,
          trending: ev.trending || false
        }));
        setEvents(mapped);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="student-events-page">
      <h2>Upcoming Events</h2>
      <div className="event-list">
        {events.length === 0 ? (
          <p>No events available.</p>
        ) : (
          events.map(event => <EventCard key={event.id} event={event} />)
        )}
      </div>
    </div>
  );
}

export default StudentEvents;// import React from "react";

// function EventCard({ event }) {
//   return (
//     <div className="event-card">
//       <div className="image-wrapper">
//         <img src={event.image} alt={event.title} />
//         {event.trending && <span className="badge trending">Trending</span>}
//         {event.free && <span className="badge free">Free</span>}
//       </div>

//       <div className="event-info">
//         <h3>{event.title}</h3>
//         <p>📍 {event.college}</p>
//         <p>📅 {event.date}</p>
//         <p>👥 {event.registered} registered</p>
//         <p className="department">{event.department}</p>
//         {!event.free && <p className="fee">{event.fee}</p>}

//         <button className="btn btn-primary">View Details</button>
//       </div>
//     </div>
//   );
// }

// export default EventCard;
