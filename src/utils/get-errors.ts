import { HTTP_STATUS } from "../core/http-status.type";
import { ErrorsResponse } from "../core/errors.type";

export const getErrors = (
  status: HTTP_STATUS,
  field: string,
  errorsResponse: ErrorsResponse,
): ErrorsResponse => {
  switch (status) {
    case HTTP_STATUS.BAD_REQUEST_400:
      errorsResponse.errorsMessages.push({
        field,
        message: `${field} is invalid`,
      });
      break;
    case HTTP_STATUS.NOT_FOUND_404:
      errorsResponse.errorsMessages.push({
        field,
        message: `${field} not found`,
      });
      break;
  }
  return errorsResponse;
};
