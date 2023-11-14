import { Router } from "express";
import { getJob, getJobs, deleteJob, editJob, createJob } from "../controllers/job.controller.js";

const router = Router();

router.route("/")
  .get(getJobs)
  .post(createJob)

router.route("/:id")
  .get(getJob)
  .delete(deleteJob)
  .patch(editJob)

export default router;