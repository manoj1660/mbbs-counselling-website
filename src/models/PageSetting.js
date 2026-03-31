import mongoose from "mongoose";

const PageSettingSchema = new mongoose.Schema({
  pageName: { type: String, required: true, unique: true }, // e.g., "universities-main"
  seo: {
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    keywords: { type: [String], default: [] }
  },
  heroTitle: String,
  heroSubtitle: String
}, { timestamps: true });

export default mongoose.models.PageSetting || mongoose.model("PageSetting", PageSettingSchema);