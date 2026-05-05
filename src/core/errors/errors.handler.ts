import { Response } from "express";
import { RepositoryNotFoundError } from "./repository-not-found.error";
import { HTTP_STATUS } from "../types/http-status.type";
import { createErrorMessages } from "../middlewares/validation/input-validation.middleware";
import { DomainError } from "./domain.error";

export const errorsHandler = (error: unknown, res: Response): void => {
  if (error instanceof RepositoryNotFoundError) {
    const httpStatus = HTTP_STATUS.NOT_FOUND_404;

    res.status(httpStatus).send(
      createErrorMessages([
        {
          status: httpStatus,
          detail: error.message,
        },
      ]),
    );
    return;
  }

  if (error instanceof DomainError) {
    const httpStatus = HTTP_STATUS.UNPROCESSABLE_ENTITY_422;
    res.status(httpStatus).send(
      createErrorMessages([
        {
          status: httpStatus,
          detail: error.message,
          source: error.source,
          code: error.code,
        },
      ]),
    );

    return;
  }
  console.log("errr", error);
  res.sendStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR_500);
};
