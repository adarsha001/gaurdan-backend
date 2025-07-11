// models/Property.js
import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
  },
  building_age: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  beds: {
    type: Number,
    required: true,
    min: 1,
  },
  squarefeet: {
    type: Number,
    required: true,
    min: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Property', propertySchema);
