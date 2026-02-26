import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    createdBy: { type: String, required: true }, // admin email or id
    filename: { type: String } // uploaded file name
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);