import { HTTP_STATUS } from "./http-status.type";

type ErrorType = { message: string; field: string };

type ErrorsResponse = { errorMessages: ErrorType[] };

type ValidationErrorType = {
  status: HTTP_STATUS;
  detail: string;
  source?: string;
  code?: string;
};

export type { ErrorType, ErrorsResponse, ValidationErrorType };
