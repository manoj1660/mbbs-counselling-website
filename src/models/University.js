import mongoose from "mongoose";

const UniversitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  country: { type: String, required: true }, // Lowercase country slug (e.g., 'russia')
  location: { type: String, required: true },
  established: { type: String },
  ranking: { type: String },
  isFeatured: {
    type: Boolean,
    default: false // By default false rahega

  },
  fee: { type: String }, // Stored as string to keep currency symbols (₽/$)
  image: { type: String }, // Cloudinary URL
  tags: [{ type: String }], // Array of strings like ["NMC Approved", "Government"]
  features: [{ type: String }], // Array of features like ["Modern Campus", "Research Facilities"]
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.University || mongoose.model("University", UniversitySchema);