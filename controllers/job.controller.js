import Job from '../models/job.model.js';

//Get all jobs
export const getJobs = (req, res) => {
};

// CREATE JOB
export const createJob = async (req, res) => {
  const { company, position } = req.body;
  const newJob = await new Job({ company, position });
  res.status(201).json(newJob);
};

// GET SINGLE JOB
export const getJob = (req, res) => {

};

// EDIT JOB
export const editJob = (req, res) => {

};

// DELETE JOB
export const deleteJob = (req, res) => {

};
