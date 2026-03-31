import mongoose from "mongoose";

const CountryDetailSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },

    title: String,
    image: String, // hero image
    heroText: String,

    stats: {
      students: String,
      colleges: String,
      medium: String,
    },

    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String], // e.g. ["MBBS in Russia", "Saratov University Fees"]
    },
    
    description: String,

    whyStudy: [String],

    eligibility: {
      pcb: String,
      age: String,
      neet: String,
    },

    feeRange: String,
  },
  { timestamps: true },
);

export default mongoose.models.CountryDetail ||
  mongoose.model("CountryDetail", CountryDetailSchema);
