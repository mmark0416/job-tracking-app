import 'dotenv/config'
import express from 'express';
import morgan from 'morgan';
import { nanoid } from 'nanoid';
const app = express();
import jobRouter from './routes/job.router.js'
import connectDB from './db/connectDB.js';

let jobs = [
  {id:nanoid(), title:'Google', description:'frontend'},
  {id:nanoid(), title:'Apple', description:'backend'},
]

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/jobs', jobRouter)

app.use("*", (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: `server error ${err.message}` });
});

const port = process.env.PORT || 5100;

app.listen(port, async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log(`Example app listening on port ${port}!`);
  } catch (error) {
    
  }
});

