import { ErrorsResponse, ErrorType } from "../../types/errors.type";
import {
  FieldValidationError,
  ValidationError,
  validationResult,
} from "express-validator";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../types/http-status.type";

const createErrorMessages = (errors: ErrorType[]): ErrorsResponse => {
  return { errorMessages: errors };
};

const formatError = (error: ValidationError): ErrorType => {
  const expressError = error as unknown as FieldValidationError;
  return {
    field: expressError.path,
    message: expressError.msg,
  };
};

const inputValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error = validationResult(req)
    .formatWith(formatError)
    .array({ onlyFirstError: true });
  if (error.length > 0) {
    res
      .status(HTTP_STATUS.UNPROCESSABLE_ENTITY_422)
      .json({ errorMessages: error });
    return;
  }
  next();
  return;
};

export { createErrorMessages, inputValidationMiddleware };
