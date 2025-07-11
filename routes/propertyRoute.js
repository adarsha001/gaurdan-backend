import express from 'express';
import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from '../controllers/propertyController.js';

const router = express.Router();

router.post('/', createProperty);            // Create new property
router.get('/', getProperties);              // Get all properties
router.get('/:id', getPropertyById);         // Get property by ID
router.put('/:id', updateProperty);          // Update property
router.delete('/:id', deleteProperty);       // Delete property

export default router;
