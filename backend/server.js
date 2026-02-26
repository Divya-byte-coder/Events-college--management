// // server.js
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";

// //import userRoutes from "./routes/users.js"; // make sure this file exists
// //import eventRoutes from "./routes/events.js"; // make sure this file exists

// dotenv.config();

// const app = express();

// // Only one PORT declaration
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// // Routes
// //app.use("/api/users", userRoutes);
// //app.use("/api/events", eventRoutes);

// app.get("/", (req, res) => {
//   res.send("Backend running!");
// });
// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("MongoDB connected"))
// .catch((err) => console.error(err));

// // Start server

// // import express from "express";
// // import mongoose from "mongoose";
// // import cors from "cors";
// // import dotenv from "dotenv";
// // import authRoutes from "./routes/auth.js";

// // dotenv.config();

// // const app = express();
// // const eventRoutes = require('./routes/events');
// // // Middleware
// // app.use(cors());
// // app.use(express.json());
// // app.use('/uploads', express.static('uploads')); // serve files

// // // Routes
// // app.use("/api/auth", authRoutes);
// // app.use('/api/events', eventRoutes);
// // // Test route
// // app.get("/", (req, res) => {
// //   res.send("Backend is running ✅");
// // });

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected ✅"))
//   .catch((err) => console.log("MongoDB connection error ❌", err));
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// server.js
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads")); // serve static files

// // Test route
// app.get("/", (req, res) => {
//   res.send("Backend running!");
// });

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("MongoDB connected ✅"))
// .catch((err) => console.error("MongoDB connection error ❌", err));

// // Start server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/events.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend running!");
});

// Connect to MongoDB (Mongoose 7+ handles options automatically)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection error ❌", err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));