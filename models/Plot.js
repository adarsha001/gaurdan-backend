
const mongoose = require('mongoose');
const plotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  plot_type: { 
    type: String, 
    required: true,
    enum: ['Residential', 'Commercial', 'Agricultural', 'Industrial', 'Mixed-Use']
  },
  price: { type: Number, required: true, min: 0 },
  map_url: { type: String },
  dimensions: { 
    length: { type: Number, required: true },
    width: { type: Number, required: true }
  },
  area: { type: Number, required: true },
  ownership_type: {
    type: String,
    enum: ['Freehold', 'Leasehold', 'Cooperative', 'Condominium'],
    required: true
  },
  zoning: { type: String },
  soil_type: { type: String },
  access_road: { type: Boolean, default: false },
  utilities: {
    water: { type: Boolean, default: false },
    electricity: { type: Boolean, default: false },
    sewage: { type: Boolean, default: false }
  },
  description: { type: String }, // 👈 Added here
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

const Plot = mongoose.model('Plot', plotSchema);
module.exports = Plot;