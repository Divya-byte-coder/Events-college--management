import express from "express"; // ✅ YOU MUST IMPORT THIS
import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
import multer from "multer";
import path from "path";

const router = express.Router();

/* ===========================
   Multer Storage Config
=========================== */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ===========================
   CREATE EVENT
=========================== */

router.post("/create", upload.single("file"), async (req, res) => {
  try {
    const { title, description, date, createdBy, fee } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      fee: fee || 0,
      createdBy,
      filename: req.file ? req.file.filename : null,
      registeredCount: 0,
    });

    await newEvent.save();

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ===========================
   GET ALL EVENTS
=========================== */

router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ===========================
   GET SINGLE EVENT
=========================== */

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// GET ALL REGISTRATIONS (ADMIN)
router.get("/registrations/all", async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate("event")
      .sort({ createdAt: -1 });

    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   REGISTER STUDENT
=========================== */

router.post("/register/:eventId", async (req, res) => {
  try {
    const { name, email, phone, college, department } = req.body;

    const registration = new Registration({
      event: req.params.eventId,
      name,
      email,
      phone,
      college,
      department,
    });

    await registration.save();

    // Increase registeredCount
    await Event.findByIdAndUpdate(req.params.eventId, {
      $inc: { registeredCount: 1 },
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   GET ALL REGISTRATIONS (ADMIN)
=========================== */

router.get("/registrations/all", async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate("event")
      .sort({ createdAt: -1 });

    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   DELETE REGISTRATION
=========================== */

router.delete("/registrations/delete/:id", async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    // Decrease registeredCount
    await Event.findByIdAndUpdate(registration.event, {
      $inc: { registeredCount: -1 },
    });

    await Registration.findByIdAndDelete(req.params.id);

    res.json({ message: "Registration deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   UPDATE EVENT
=========================== */

router.put("/update/:id", upload.single("file"), async (req, res) => {
  try {
    const { title, description, date, fee } = req.body;

    const updatedData = {
      title,
      description,
      date,
      fee,
    };

    if (req.file) {
      updatedData.filename = req.file.filename;
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   DELETE EVENT
=========================== */

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;