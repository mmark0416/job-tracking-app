import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customError.js";

const withValidationErrorHandler = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJob = withValidationErrorHandler([
  body("company")
    .isLength({ min: 2 })
    .withMessage("company must be at least 2 characters")
    .trim(),
  body("position")
    .isLength({ min: 2 })
    .withMessage("position must be at least 2 characters"),
]);
