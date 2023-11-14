import Job from '../models/job.model.js';

//Get all jobs
export const getJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(200).json({jobs});
};

// CREATE JOB
export const createJob = async (req, res) => {
  const { company, position } = req.body;
  const newJob = await Job.create({ company, position });
  res.status(201).json({newJob});
};

// GET SINGLE JOB
export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  console.log(id);
  if(!job){
    res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({job});
};

// EDIT JOB
export const editJob = (req, res) => {

};

// DELETE JOB
export const deleteJob = (req, res) => {

};
