import { ValidationErrorType } from "../../types/errors.type";
import {
  FieldValidationError,
  ValidationError,
  validationResult,
} from "express-validator";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../types/http-status.type";
import { ValidationErrorListOutput } from "../../types/validation-error.dto.type";

const createErrorMessages = (
  errors: ValidationErrorType[],
): ValidationErrorListOutput => {
  return {
    errors: errors.map((error) => {
      return {
        code: error.code ?? null,
        detail: error.detail,
        source: { pointer: error.source ?? "" },
        status: error.status,
      };
    }),
  };
};

const formatError = (error: ValidationError): ValidationErrorType => {
  const expressError = error as unknown as FieldValidationError;
  return {
    detail: expressError.msg,
    status: HTTP_STATUS.BAD_REQUEST_400,
    source: expressError.path,
  };
};

const inputValidationMiddleware = (
  req: Request<{}, {}, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  const error = validationResult(req)
    .formatWith(formatError)
    .array({ onlyFirstError: true });
  if (error.length > 0) {
    res
      .status(HTTP_STATUS.UNPROCESSABLE_ENTITY_422)
      .json(createErrorMessages(error));
    return;
  }
  next();
  return;
};

export { createErrorMessages, inputValidationMiddleware };
