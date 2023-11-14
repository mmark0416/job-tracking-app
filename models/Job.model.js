import mongoose from "mongoose";
import { JOB_STATUSES, JOB_TYPES } from "../utils/constants.js";

const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUSES),
      default: JOB_STATUSES.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPES),
      default: JOB_TYPES.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: "my city",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
