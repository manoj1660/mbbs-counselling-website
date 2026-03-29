import mongoose from "mongoose";

const UniversityDetailSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: String,
  image: String,
  location: String,
  established: String,
  ranking: {
    world: String,
    country: String,
  },
  intro: String,

  // Simple Arrays
  highlights: [String],
  eligibility: [String],
  admissionSteps: [String],
  documents: [String],

  // Complex Objects & Arrays
  tuitionFees: [
    {
      year: String,
      tuitionfees: String,
      tuitionINR: String,
    }
  ],
  totalPackage: String,

  accommodation: {
    type: { type: String }, // 'type' is a reserved keyword in Schema, so using this way
    roomSharing: String,
    facilities: [String],
    indianFood: String,
  },

  clinicalRotation: {
    hospitals: [String],
    practicalTraining: String,
  },

  cityLife: {
    name: String,
    description: String,
    travel: String,
  },

  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.UniversityDetail || mongoose.model("UniversityDetail", UniversityDetailSchema);