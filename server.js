import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import propertyRoutes from './routes/propertyRoute.js';
import plotRoutes from './routes/plotRoute.js';
import contactRoutes from './routes/contactRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import leads from './routes/leads.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/chat", chatRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/plots', plotRoutes);
app.use('/api/leads', leads)
app.use('/api/contact', contactRoutes);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(process.env.PORT, () => console.log('Server running on port 5000'));
})
.catch((err) => console.error(err));