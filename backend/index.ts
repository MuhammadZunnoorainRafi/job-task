import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/authRoute';
import 'colors';
import { connectDB } from './config/connectDb';
import { errorMiddleware } from './middlewares/errorMiddleware';

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
);

const PORT = process.env.PORT || 8000;

app.use('/api/auth', authRoute);

app.use(errorMiddleware);

app.listen(PORT, () =>
  console.log(`server is running on PORT : http://localhost:${PORT}`)
);
