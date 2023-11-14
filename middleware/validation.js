import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customError.js";
import { JOB_STATUSES, JOB_TYPES } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from '../models/job.model.js';

const withValidationErrorHandler = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg);
        if(errorMessages[0].startsWith('no job'))
          throw new NotFoundError(errorMessages);
        
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrorHandler([
  body("company").notEmpty().withMessage("company must be provided"),
  body("position").notEmpty().withMessage("position must be provided"),
  body("jobLocation").notEmpty().withMessage("job location must be provided"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUSES))
    .withMessage("invalid job status"),
  body("jobType")
    .isIn(Object.values(JOB_TYPES))
    .withMessage("invalid job type"),
]);

export const validateJobId = withValidationErrorHandler([
  param("id").custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid job id");
    const job = await Job.findById(value);

    if (!job) throw new NotFoundError(`no job with id ${value}`);
  }),
]);
