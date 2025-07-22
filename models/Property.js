// models/Property.js
import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  building_age: { type: String },
  price: { type: String, required: true, min: 0 },
  map_url: { type: String },
  beds: { type: Number, required: true, min: 1 },
  squarefeet: { type: Number, required: true, min: 100 },
  images: [
    {
      url: String,
      public_id: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Property', propertySchema);
