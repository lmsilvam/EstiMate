// backend/index.mjs
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import uploadRoutes from './routes/upload.mjs';
import queryRoutes from './routes/query.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Global rate limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20, // limit each IP to 20 requests per minute
  message: 'Too many requests. Please try again later.',
});

app.use(limiter);
app.use(cors());
app.use(express.json());
app.use('/api', uploadRoutes);
app.use('/api', queryRoutes);

app.listen(PORT, () => {
  console.log(`EstiMate backend running on http://localhost:${PORT}`);
});

