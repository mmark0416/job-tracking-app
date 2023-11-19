import { NotFoundError } from "../errors/customError.js";
import Job from "../models/job.model.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import dayjs from "dayjs";

//Get all jobs
export const getJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;
  const queryObj = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObj.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  if (jobStatus && jobStatus !== "all") {
    queryObj.jobStatus = jobStatus;
  }

  if (jobType && jobType !== "all") {
    queryObj.jobType = jobType;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObj).sort(sortKey).skip(skip).limit(limit);

  const totalJobs = await Job.countDocuments(queryObj);
  const numOfPages = Math.ceil(totalJobs / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
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
  const removedJob = await Job.findByIdAndDelete(req.params.id);

  res.status(StatusCodes.OK).json({ msg: "job deleted", job: removedJob });
};

// STATS
export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$jobStatus",
        count: { $sum: 1 },
      },
    },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = dayjs()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return {
        date,
        count,
      };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
