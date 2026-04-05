import mongoose from "mongoose";

const UniversityDetailSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: String,
  imageAlt: String, // SEO: Image ke peeche ka text
  location: String,
  established: String,
  ranking: {
    world: String,
    country: String,
  },
  intro: String,

  // --- NEW SEO SECTION ---
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String], // e.g. ["MBBS in Russia", "Saratov University Fees"]
  },

  // --- SCHEMA SPECIAL FIELDS ---
  rating: { type: Number, default: 4.5 }, // Google star rating ke liye
  courseDuration: { type: String, default: "6 Years" }, 

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
    type: { type: String }, 
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

  detailedContent: { 
    type: String, 
    default: "" 
  },
  websiteUrl: { 
  type: String, 
  default: "",
  match: [/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, 'Please fill a valid URL']
},

  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update the timestamp on save
UniversityDetailSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.UniversityDetail || mongoose.model("UniversityDetail", UniversityDetailSchema);



// import mongoose from "mongoose";

// const UniversityDetailSchema = new mongoose.Schema({
//   slug: { type: String, required: true, unique: true },
//   name: String,
//   image: String,
//   location: String,
//   established: String,
//   ranking: {
//     world: String,
//     country: String,
//   },
//   intro: String,

//   // Simple Arrays
//   highlights: [String],
//   eligibility: [String],
//   admissionSteps: [String],
//   documents: [String],

//   // Complex Objects & Arrays
//   tuitionFees: [
//     {
//       year: String,
//       tuitionfees: String,
//       tuitionINR: String,
//     }
//   ],
//   totalPackage: String,

//   accommodation: {
//     type: { type: String }, // 'type' is a reserved keyword in Schema, so using this way
//     roomSharing: String,
//     facilities: [String],
//     indianFood: String,
//   },

//   clinicalRotation: {
//     hospitals: [String],
//     practicalTraining: String,
//   },

//   cityLife: {
//     name: String,
//     description: String,
//     travel: String,
//   },

//   updatedAt: { type: Date, default: Date.now },
// });

// export default mongoose.models.UniversityDetail || mongoose.model("UniversityDetail", UniversityDetailSchema);