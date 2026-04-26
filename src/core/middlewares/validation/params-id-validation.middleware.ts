import { param } from "express-validator";

export const paramsIdValidationMiddleware = param("id")
  .exists()
  .withMessage("Id is require")
  .isString()
  .withMessage("Id must be a string")
  .isLength({ min: 1, max: 24 })
  .withMessage("Id must be 24 characters long")
  .isNumeric()
  .withMessage("Id must be a number");
