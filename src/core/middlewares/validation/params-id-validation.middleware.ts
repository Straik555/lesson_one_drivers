import { body, param } from "express-validator";

export const paramsIdValidationMiddleware = param("id")
  .exists()
  .withMessage("Id is require")
  .isString()
  .withMessage("Id must be a string")
  .isMongoId()
  .withMessage("Incorrect format of ObjectId");

export const dataIdMatchValidation = body("data.id")
  .exists()
  .withMessage("ID in body is required")
  .custom((value, { req }) => {
    if (value !== req?.params?.id) {
      throw new Error("ID in URL and body must match");
    }
    return true;
  });
