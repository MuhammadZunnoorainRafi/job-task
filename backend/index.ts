import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
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

app.listen(PORT, () =>
  console.log(`server is running on PORT : http://localhost:${PORT}`)
);
