import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import propertyRoutes from './routes/propertyRoute.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/properties', propertyRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(process.env.PORT, () => console.log('Server running on port 5000'));
})
.catch((err) => console.error(err));
