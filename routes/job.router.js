import { Router } from "express";
import { getJob, getJobs, deleteJob, editJob, createJob } from "../controllers/job.controller.js";
import { validateJobId, validateJobInput } from "../middleware/validation.js";

const router = Router();

router.route("/")
  .get(getJobs)
  .post(validateJobInput, createJob)

router.route("/:id")
  .get(validateJobId, getJob)
  .delete(validateJobId, deleteJob)
  .patch(validateJobId, validateJobInput, editJob)

export default router;