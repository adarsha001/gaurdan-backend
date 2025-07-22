import express from 'express';
import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from '../controllers/propertyController.js';
// ✅ Correct
import upload from '../middleware/upload.js';


const router = express.Router();

router.post('/', upload.array('images'), createProperty);            // Create new property
router.get('/', getProperties);              // Get all properties
router.get('/:id', getPropertyById);         // Get property by ID
router.put('/:id', updateProperty);          // Update property
router.delete('/:id', deleteProperty);       // Delete property

export default router;



// const express = require('express');
// const router = express.Router();
// const upload = require('../middleware/upload'); // ✅ using central multer config
// const Property = require('../models/Property');

// // Create a new property
// router.post('/', upload.single('image'), async (req, res) => {
//   try {
//     const { name, location, price, beds, squarefeet, map_url } = req.body;

//     const newProperty = new Property({
//       name,
//       location,
//       price,
//       beds,
//       squarefeet,
//       map_url,
//       image: req.file?.filename, // depends on your upload middleware
//     });

//     await newProperty.save();
//     res.status(201).json(newProperty);
//   } catch (error) {
//     console.error('Error creating property:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// module.exports = router; // ✅ you're using CommonJS (require), so use module.exports




