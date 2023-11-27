import 'dotenv/config'
import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
const app = express();
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import helmet from 'helmet';
import mongSanitize from "express-mongo-sanitize"

// routes
import jobRouter from './routes/job.router.js'
import authRouter from './routes/auth.router.js'
import userRouter from './routes/user.router.js'

// db
import connectDB from './db/connectDB.js';

// middleware
import errorHandler from './middleware/errorHandler.js';
import {authenticateUser} from './middleware/auth.middleware.js';

// public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

app.use(express.static(path.resolve(__dirname, './client/dist')));

app.use(cookieParser());
app.use(express.json());
app.use(helmet())
app.use(mongSanitize())

app.use('/api/v1/jobs', authenticateUser, jobRouter)
app.use('/api/v1/users', authenticateUser, userRouter)
app.use('/api/v1/auth', authRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'))
})

app.use("*", (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use(errorHandler);

const port = process.env.PORT || 5100;

app.listen(port, async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log(`Example app listening on port ${port}!`);
  } catch (error) {
    
  }
});

