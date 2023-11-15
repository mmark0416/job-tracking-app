import 'dotenv/config'
import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
const app = express();
import cookieParser from 'cookie-parser';

// routes
import jobRouter from './routes/job.router.js'
import authRouter from './routes/auth.router.js'

// db
import connectDB from './db/connectDB.js';

// middleware
import errorHandler from './middleware/errorHandler.js';
import {authenticateUser} from './middleware/auth.middleware.js';

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/jobs', authenticateUser, jobRouter)
app.use('/api/v1/auth', authRouter)

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

