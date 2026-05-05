import { HTTP_STATUS } from "./http-status.type";

type ValidationErrorOutput = {
  status: HTTP_STATUS;
  detail: string;
  source: { pointer: string };
  code: string | null;
};

export type ValidationErrorListOutput = { errors: ValidationErrorOutput[] };
