import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    college: {
      type: String,
      trim: true,
    },

    department: {
      type: String,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    fee: {
      type: Number,
      default: 0, // 0 = Free event
    },

    maxParticipants: {
      type: Number,
      default: 0, // 0 = unlimited
    },

    registeredCount: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: String,
      required: true,
    },

    filename: {
      type: String, // event poster image
    },

    status: {
      type: String,
      enum: ["upcoming", "completed", "cancelled"],
      default: "upcoming",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema); import mongoose from "mongoose";

// const eventSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String },
//     date: { type: Date, required: true },
//     createdBy: { type: String, required: true }, // admin email or id
//     filename: { type: String } // uploaded file name
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Event", eventSchema);