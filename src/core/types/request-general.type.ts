import type { Request } from "express";

type RequestWithBody<T> = Request<{}, {}, T>;
type RequestWithQuery<T> = Request<{}, {}, {}, T>;
type RequestWithParams<T> = Request<T>;
type RequestWithParamsAndBody<P, B> = Request<P, {}, B>;

export type {
  RequestWithBody,
  RequestWithQuery,
  RequestWithParams,
  RequestWithParamsAndBody,
};
