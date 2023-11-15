import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customError.js";
import { JOB_STATUSES, JOB_TYPES } from "../utils/constants.utils.js";
import mongoose from "mongoose";
import Job from "../models/job.model.js";
import User from "../models/User.model.js";

const withValidationErrorHandler = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg);
        if (errorMessages[0].startsWith("no job"))
          throw new NotFoundError(errorMessages);
        if (errorMessages[0].startsWith("not authorized"))
          throw new UnauthorizedError("not authorized to access this route");

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
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid job id");
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`no job with id ${value}`);
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner)
      throw new UnauthorizedError("not authorized to access this route");
  }),
]);

export const validateRegisterInput = withValidationErrorHandler([
  body("name").notEmpty().withMessage("name must be provided"),
  body("email")
    .notEmpty()
    .withMessage("email must be provided")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new BadRequestError("email already exists");
    }),
  body("password")
    .notEmpty()
    .withMessage("password must be provided")
    .isLength({ min: 8 })
    .withMessage("password must be at least 6 characters long"),
  body("location").notEmpty().withMessage("location must be provided"),
  body("lastName").notEmpty().withMessage("lastName must be provided"),
]);

export const validateLoginInput = withValidationErrorHandler([
  body("email")
    .notEmpty()
    .withMessage("email must be provided")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password must be provided"),
]);

export const validateUpdateUserInput = withValidationErrorHandler([
  body("name").notEmpty().withMessage("name must be provided"),
  body("email")
    .notEmpty()
    .withMessage("email must be provided")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId.toString()) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("location").notEmpty().withMessage("location must be provided"),
  body("lastName").notEmpty().withMessage("lastName must be provided"),
]);
