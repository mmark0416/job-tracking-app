import { Router } from "express";
import { checkForTestUser } from "../middleware/auth.middleware.js";
import {
  getJob,
  getJobs,
  deleteJob,
  editJob,
  createJob,
  showStats,
} from "../controllers/job.controller.js";
import { validateJobId, validateJobInput } from "../middleware/validation.js";

const router = Router();

router
  .route("/")
  .get(getJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateJobId, getJob)
  .delete(checkForTestUser, validateJobId, deleteJob)
  .patch(checkForTestUser, validateJobId, validateJobInput, editJob);

export default router;
