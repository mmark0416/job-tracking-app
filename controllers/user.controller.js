import { StatusCodes } from "http-status-codes";
import User from "../models/User.model.js";
import Job from "../models/job.model.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  res.status(StatusCodes.OK).json({ user });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  const obj = {...req.body};
  delete obj.password;

  const updatedUser = await User.findByIdAndUpdate(
    req.user.userId,
    obj,
  );
  res.status(StatusCodes.OK).json({ msg: "update user" });
};
