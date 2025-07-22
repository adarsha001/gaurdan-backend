import express from 'express';
import {
  createPlot,
  getPlots,
  getPlotById,
  updatePlot,
  deletePlot
} from '../controllers/plotController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', upload.array('images'), createPlot);
router.get('/', getPlots);
router.get('/:id', getPlotById);
router.put('/:id', upload.array('images'), updatePlot);
router.delete('/:id', deletePlot);

export default router;