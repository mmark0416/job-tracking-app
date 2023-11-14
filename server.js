import 'dotenv/config'
import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
const app = express();


// routes
import jobRouter from './routes/job.router.js'

// db
import connectDB from './db/connectDB.js';

// middleware
import errorHandler from './middleware/errorHandler.js';

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/jobs', jobRouter)

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

