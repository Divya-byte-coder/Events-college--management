import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  // 🔥 Fetch events from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Error fetching events:", err));
  }, []);

  // Hero slider images
  const heroSlides = [
    {
      title: "Discover Amazing College Events",
      desc: "Join thousands of students in exploring exciting events, competitions, and workshops across top colleges.",
      img: "https://source.unsplash.com/900x400/?concert",
    },
    {
      title: "Participate in Hackathons",
      desc: "Compete with students globally and showcase your skills in coding competitions.",
      img: "https://source.unsplash.com/900x400/?hackathon",
    },
    {
      title: "Attend Cultural Festivals",
      desc: "Enjoy cultural, musical, and business festivals from top colleges.",
      img: "https://source.unsplash.com/900x400/?festival",
    },
  ];

  const exploreCards = [
    {
      title: "Departments",
      description: "Browse events by academic departments",
      icon: "🎓",
      link: "/departments",
    },
    {
      title: "Colleges",
      description: "Discover events from top institutions",
      icon: "🏛️",
      link: "/colleges",
    },
    {
      title: "All Events",
      description: "View complete event calendar",
      icon: "🎉",
      link: "/events",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <Slider {...sliderSettings}>
          {heroSlides.map((slide, idx) => (
            <div key={idx} className="hero-slide">
              <img src={slide.img} alt={slide.title} />
              <div className="hero-text">
                <h1>{slide.title}</h1>
                <p>{slide.desc}</p>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* 🔥 Dynamic Events Section */}
      <section className="trending-section">
        <div className="section-header">
          <h2>📅 Latest Events</h2>
        </div>

        <div className="trending-events">
          {events.length === 0 ? (
            <p>No events available</p>
          ) : (
            events.map((event) => (
              <EventCard
                key={event._id}
                event={{
                  id: event._id,
                  title: event.title,
                  college: event.createdBy,
                  date: new Date(event.date).toDateString(),
                  image: event.filename
                    ? `http://localhost:5000/uploads/${event.filename}`
                    : "https://source.unsplash.com/400x250/?event",
                }}
              />
            ))
          )}
        </div>
      </section>

      {/* Explore Section */}
      <section className="explore-section">
        <h2>Explore More</h2>
        <div className="explore-cards">
          {exploreCards.map((card, idx) => (
            <div
              key={idx}
              className="explore-card"
              onClick={() => navigate(card.link)}
            >
              <div className="icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;// import React from "react";
// import Navbar from "../components/Navbar";
// import EventCard from "../components/EventCard";
// import Footer from "../components/Footer";
// import { useNavigate } from "react-router-dom";
// import Slider from "react-slick"; // make sure to install react-slick

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// function Home() {
//   const navigate = useNavigate();

//   // Hero slider images
//   const heroSlides = [
//     {
//       title: "Discover Amazing College Events",
//       desc: "Join thousands of students in exploring exciting events, competitions, and workshops across top colleges.",
//       img: "https://source.unsplash.com/900x400/?concert",
//     },
//     {
//       title: "Participate in Hackathons",
//       desc: "Compete with students globally and showcase your skills in coding competitions.",
//       img: "https://source.unsplash.com/900x400/?hackathon",
//     },
//     {
//       title: "Attend Cultural Festivals",
//       desc: "Enjoy cultural, musical, and business festivals from top colleges.",
//       img: "https://source.unsplash.com/900x400/?festival",
//     },
//   ];

//   // Trending events
//   const trendingEvents = [
//     {
//       id: 1,
//       title: "TechFest 2026",
//       college: "MIT College of Engineering",
//       date: "Mar 15, 2026",
//       registered: "342 / 500",
//       department: "Computer Science",
//       fee: "$50",
//       trending: true,
//       free: false,
//       image: "https://source.unsplash.com/400x250/?conference",
//     },
//     {
//       id: 2,
//       title: "Hackathon 2026",
//       college: "Stanford University",
//       date: "Mar 22, 2026",
//       registered: "178 / 200",
//       department: "Computer Science",
//       fee: "Free",
//       trending: true,
//       free: true,
//       image: "https://source.unsplash.com/400x250/?hackathon",
//     },
//     {
//       id: 3,
//       title: "Business Summit 2026",
//       college: "Harvard University",
//       date: "Apr 1, 2026",
//       registered: "245 / 300",
//       department: "Business",
//       fee: "$75",
//       trending: true,
//       free: false,
//       image: "https://source.unsplash.com/400x250/?business",
//     },
//   ];

//   // Explore section cards
//   const exploreCards = [
//     {
//       title: "Departments",
//       description: "Browse events by academic departments",
//       icon: "🎓",
//       link: "/departments",
//     },
//     {
//       title: "Colleges",
//       description: "Discover events from top institutions",
//       icon: "🏛️",
//       link: "/colleges",
//     },
//     {
//       title: "All Events",
//       description: "View complete event calendar",
//       icon: "🎉",
//       link: "/events",
//     },
//   ];

//   // Hero slider settings
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 800,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 4000,
//   };

//   return (
//     <>
//       <Navbar />

//       {/* Hero Section */}
//       <section className="hero-section">
//         <Slider {...sliderSettings}>
//           {heroSlides.map((slide, idx) => (
//             <div key={idx} className="hero-slide">
//               <img src={slide.img} alt={slide.title} />
//               <div className="hero-text">
//                 <h1>{slide.title}</h1>
//                 <p>{slide.desc}</p>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </section>

//       {/* Trending Events */}
//       <section className="trending-section">
//         <div className="section-header">
//           <h2>📈 Trending Events</h2>
//           <span className="view-all" onClick={() => navigate("/events")}>
//             View All →
//           </span>
//         </div>

//         <div className="trending-events">
//           {trendingEvents.map((event) => (
//             <EventCard key={event.id} event={event} />
//           ))}
//         </div>
//       </section>

//       {/* Explore Section */}
//       <section className="explore-section">
//         <h2>Explore More</h2>
//         <div className="explore-cards">
//           {exploreCards.map((card, idx) => (
//             <div
//               key={idx}
//               className="explore-card"
//               onClick={() => navigate(card.link)}
//             >
//               <div className="icon">{card.icon}</div>
//               <h3>{card.title}</h3>
//               <p>{card.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Footer */}
//       <Footer />
//     </>
//   );
// }

// export default Home;

