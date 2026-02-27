// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Toast from "../components/Toast";
// import Modal from "../components/Modal";

// function EventDetails() {
//   const { id } = useParams();
//   const [registered, setRegistered] = useState(false);
//   const [toast, setToast] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     college: "",
//     department: "",
//   });

//   const event = {
//     id,
//     title: "Hackathon 2026",
//     college: "ABC Engineering College",
//     date: "March 15, 2026",
//     fee: 100, // 0 = free
//     description:
//       "Join our annual Hackathon with prizes and workshops. Open for all departments.",
//   };

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   // Function to dynamically load Razorpay script
//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handleRegister = async () => {
//     setShowModal(false);

//     // Validate form
//     const emptyField = Object.entries(formData).find(
//       ([, value]) => !value.trim()
//     );
//     if (emptyField) {
//       setToast({ message: "Please fill all fields!", type: "error" });
//       return;
//     }

//     if (event.fee > 0) {
//       // Load Razorpay script dynamically
//       const loaded = await loadRazorpayScript();
//       if (!loaded) {
//         setToast({ message: "Razorpay SDK failed to load.", type: "error" });
//         return;
//       }

//       const options = {
//         key: "rzp_test_xxxxxxxxx", // Replace with your Razorpay test key
//         amount: event.fee * 100, // in paise
//         currency: "INR",
//         name: event.title,
//         description: `Registration for ${event.title}`,
//         prefill: {
//           name: formData.name,
//           email: formData.email,
//           contact: formData.phone,
//         },
//         handler: function (response) {
//           setRegistered(true);
//           setToast({
//             message: `Payment successful! You are registered for ${event.title}.`,
//             type: "success",
//           });
//           console.log("Razorpay payment ID:", response.razorpay_payment_id);
//         },
//         theme: { color: "#2563EB" },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } else {
//       // Free event
//       setRegistered(true);
//       setToast({ message: `Registered for ${event.title}!`, type: "success" });
//     }
//   };

//   const submitClick = (e) => {
//     e.preventDefault();
//     setShowModal(true);
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="event-details-container fade-in">
//         <h2>{event.title}</h2>
//         <p>
//           <strong>College:</strong> {event.college}
//         </p>
//         <p>
//           <strong>Date:</strong> {event.date}
//         </p>
//         <p>
//           <strong>Registration Fee:</strong>{" "}
//           {event.fee === 0 ? "Free" : `₹${event.fee}`}
//         </p>
//         <p>{event.description}</p>

//         {registered ? (
//           <button className="btn btn-primary" disabled>
//             Registered ✔
//           </button>
//         ) : (
//           <form className="registration-form" onSubmit={submitClick}>
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone"
//               value={formData.phone}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="college"
//               placeholder="College"
//               value={formData.college}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="department"
//               placeholder="Department"
//               value={formData.department}
//               onChange={handleChange}
//             />
//             <button type="submit" className="btn btn-primary">
//               Register
//             </button>
//           </form>
//         )}
//       </div>

//       <Modal
//         show={showModal}
//         onClose={() => setShowModal(false)}
//         onConfirm={handleRegister}
//       >
//         <h3>Confirm Registration</h3>
//         <p>
//           {event.fee > 0
//             ? `You will be redirected to payment of ₹${event.fee}.`
//             : "Do you want to register for this free event?"}
//         </p>
//       </Modal>

//       {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}
//     </>
//   );
// }

// export default EventDetails;


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
import Modal from "../components/Modal";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [toast, setToast] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    department: "",
  });

  // ✅ Fetch event
  useEffect(() => {
  const fetchEvent = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/events/${id}`);
      const data = await res.json();
      setEvent(data);
    } catch (err) {
      console.error(err);
      setToast({ message: "Failed to load event", type: "error" });
    }
  };

  fetchEvent();
}, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Razorpay loader
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ✅ SAVE REGISTRATION (CORRECT ROUTE)
  const saveRegistration = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/events/register/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Registration failed");

      setRegistered(true);
      setToast({
        message: "Registration Successful!",
        type: "success",
      });

      // Clear form
      setFormData({
        name: "",
        email: "",
        phone: "",
        college: "",
        department: "",
      });
    } catch (err) {
      setToast({ message: err.message, type: "error" });
    }
  };

  const handleRegister = async () => {
    setShowModal(false);

    const emptyField = Object.values(formData).find(
      (value) => !value.trim()
    );

    if (emptyField) {
      setToast({ message: "Please fill all fields!", type: "error" });
      return;
    }

    // ✅ If Paid Event
    if (event.fee > 0) {
      const loaded = await loadRazorpayScript();

      if (!loaded) {
        setToast({
          message: "Payment gateway failed to load",
          type: "error",
        });
        return;
      }

      const options = {
        key: "rzp_test_xxxxxxxxx", // Replace with your key
        amount: event.fee * 100,
        currency: "INR",
        name: event.title,
        description: `Registration for ${event.title}`,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        handler: async function () {
          await saveRegistration();
        },
        theme: { color: "#2563EB" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      // ✅ Free event
      await saveRegistration();
    }
  };

  const submitClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  if (!event) return <p style={{ padding: "40px" }}>Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="event-details-container fade-in">
        <h2>{event.title}</h2>

        <p>
          <strong>Date:</strong>{" "}
          {new Date(event.date).toLocaleDateString()}
        </p>

        <p>
          <strong>Registration Fee:</strong>{" "}
          {event.fee === 0 ? "Free" : `₹${event.fee}`}
        </p>

        <p>{event.description}</p>

        {registered ? (
          <button className="btn btn-primary" disabled>
            Registered ✔
          </button>
        ) : (
          <form className="registration-form" onSubmit={submitClick}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="college"
              placeholder="College"
              value={formData.college}
              onChange={handleChange}
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        )}
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleRegister}
      >
        <h3>Confirm Registration</h3>
        <p>
          {event.fee > 0
            ? `You will be redirected to payment of ₹${event.fee}.`
            : "Do you want to register for this free event?"}
        </p>
      </Modal>

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

export default EventDetails;