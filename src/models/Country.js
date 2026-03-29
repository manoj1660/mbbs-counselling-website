import mongoose from 'mongoose';

const CountrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  students: { type: String, default: "0+" },
  fee: { type: String, required: true },
  image: { type: String, required: true }, // Cloudinary URL
  cloudinaryId: { type: String }, 
  isTop: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Country || mongoose.model('Country', CountrySchema);