import { NotFoundError } from "../errors/customError.js";
import Job from "../models/job.model.js";
import { StatusCodes } from "http-status-codes";

//Get all jobs
export const getJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });

  res.status(StatusCodes.OK).json({ jobs });
};

// CREATE JOB
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const newJob = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ newJob });
};

// GET SINGLE JOB
export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  res.status(StatusCodes.OK).json({ job });
};

// EDIT JOB
export const editJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ msg: "job updated", job: updatedJob });
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  const removedJob = await Job.findByIdAndDelete(req.paramsid);

  res.status(StatusCodes.OK).json({ msg: "job deleted", job: removedJob });
};
