import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String },
  university: { type: String },
  message: { type: String },
  status: { type: String, default: "New" }, // New, Contacted, Admission Done
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);