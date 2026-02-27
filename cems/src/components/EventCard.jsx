import { useNavigate } from "react-router-dom";

function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <div
      className="event-card"
      onClick={() => navigate(`/event/${event.id}`)}
    >
      <div className="event-image">🎉</div>

      <h4>{event.title}</h4>
      <p>{event.college}</p>
      <p className="event-date">{event.date}</p>

      <span className={event.fee === 0 ? "badge-free" : "badge-paid"}>
        {event.fee === 0 ? "Free" : `₹${event.fee}`}
      </span>

      <button className="btn btn-primary">View Details</button>
    </div>
  );
}

export default EventCard;
