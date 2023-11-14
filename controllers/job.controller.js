import Job from '../models/job.model.js';
import {StatusCodes} from 'http-status-codes';

//Get all jobs
export const getJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({jobs});
};

// CREATE JOB
export const createJob = async (req, res) => {
  const { company, position } = req.body;
  const newJob = await Job.create({ company, position });
  res.status(StatusCodes.CREATED).json({newJob});
};

// GET SINGLE JOB
export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  console.log(id);
  if(!job){
    res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(StatusCodes.OK).json({job});
};

// EDIT JOB
export const editJob = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });

  if(!updatedJob){
    res.status(404).json({ msg: `no job with id ${id}` });
  }

  res.status(StatusCodes.OK).json({msg: "job updated", job: updatedJob});
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);

  if(!removedJob){
    res.status(404).json({ msg: `no job with id ${id}` });
  }

  res.status(StatusCodes.OK).json({msg: "job deleted", job: removedJob});
};
