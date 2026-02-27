import express from "express";
import Registration from "../models/Registration.js";
import Event from "../models/Event.js";

const router = express.Router();

/* =====================================
   CREATE REGISTRATION (Student)
===================================== */
router.post("/", async (req, res) => {
  try {
    const { eventId, name, email, phone, college, department } = req.body;

    if (!eventId) {
      return res.status(400).json({ error: "Event ID is required" });
    }

    // ✅ Save registration with correct field name
    const newRegistration = new Registration({
      event: eventId, // IMPORTANT: match model field
      name,
      email,
      phone,
      college,
      department,
    });

    await newRegistration.save();

    // ✅ Increase registeredCount automatically
    await Event.findByIdAndUpdate(eventId, {
      $inc: { registeredCount: 1 },
    });

    res.status(201).json({
      success: true,
      message: "Registered successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =====================================
   GET ALL REGISTRATIONS (Admin)
===================================== */
router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate("event", "title date") // FIXED: event not eventId
      .sort({ createdAt: -1 });

    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;