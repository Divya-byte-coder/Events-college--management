// // const express = require('express');
// // const router = express.Router();
// // const Event = require('../models/Event');
// // const multer = require('multer');
// // const path = require('path');
// import express from "express";
// import multer from "multer";
// import path from "path";
// import Event from "../models/Event.js";

// // ================= MULTER STORAGE =================
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix =
//       Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// // ================= CREATE EVENT =================
// router.post('/create', upload.single('file'), async (req, res) => {
//   try {
//     const { title, description, date, createdBy } = req.body;

//     const filename = req.file ? req.file.filename : null;

//     const newEvent = new Event({
//       title,
//       description,
//       date,
//       createdBy,
//       filename,
//     });

//     await newEvent.save();

//     res.status(201).json({
//       message: 'Event created successfully',
//       event: newEvent,
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // ================= GET ALL EVENTS =================
// router.get('/', async (req, res) => {
//   try {
//     const events = await Event.find().sort({ date: 1 });
//     res.json(events);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;// const express = require('express');
// // const router = express.Router();
// // const Event = require('../models/Event');
// // const multer = require('multer');
// // const path = require('path');

// // // Set storage for uploaded files
// // const storage = multer.diskStorage({
// //   destination: function(req, file, cb) {
// //     cb(null, 'uploads/'); // folder in backend
// //   },
// //   filename: function(req, file, cb) {
// //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
// //     cb(null, uniqueSuffix + path.extname(file.originalname));
// //   }
// // });

// // const upload = multer({ storage: storage });

// // // Create event (Admin)
// // router.post('/create', upload.single('file'), async (req, res) => {
// //   try {
// //     const { title, description, date, createdBy } = req.body;
// //     const filename = req.file ? req.file.filename : null;

// //     const newEvent = new Event({ title, description, date, createdBy, filename });
// //     await newEvent.save();

// //     res.status(201).json({ message: 'Event created successfully', event: newEvent });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // Get all events (Students)
// // router.get('/', async (req, res) => {
// //   try {
// //     const events = await Event.find().sort({ date: 1 });
// //     res.json(events);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });


// // module.exports = router;

import express from "express";
import Event from "../models/Event.js";
import multer from "multer";
import path from "path";

const router = express.Router(); // ✅ YOU WERE MISSING THIS

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ Create Event
router.post("/create", upload.single("file"), async (req, res) => {
  try {
    const { title, description, date, createdBy } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      createdBy,
      filename: req.file ? req.file.filename : null,
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

// ✅ Get All Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;