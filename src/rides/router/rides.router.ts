import { Router } from "express";
import { getRidesListHandler } from "./handler/get-rides-list.handler";
import { adminGuardMiddleware } from "../../auth/middleware/admin.guard-middleware";
import { createRideHandler } from "./handler/create-ride.handler";
import { getRideByIdHandler } from "./handler/get-ride-by-id.handler";
import { paramsIdValidationMiddleware } from "../../core/middlewares/validation/params-id-validation.middleware";
import { inputValidationMiddleware } from "../../core/middlewares/validation/input-validation.middleware";
import { rideInputValidation } from "../validation/ride-input-validation";
import { finishRideHandler } from "./handler/finish-ride.handler";
import { paginationAndSortingValidation } from "../../core/middlewares/validation/query-pagination-sorting-validation.middleware";
import { RideSortField } from "../types/ride-sort-field.type";

export const ridesRouter = Router({});
ridesRouter.use(adminGuardMiddleware);

ridesRouter.get(
  "/",
  paginationAndSortingValidation(RideSortField),
  inputValidationMiddleware,
  getRidesListHandler,
);
ridesRouter.get(
  "/:id",
  paramsIdValidationMiddleware,
  inputValidationMiddleware,
  getRideByIdHandler,
);
ridesRouter.post(
  "/",
  rideInputValidation,
  inputValidationMiddleware,
  createRideHandler,
);

ridesRouter.post(
  "/:id/actions/finish",
  paramsIdValidationMiddleware,
  inputValidationMiddleware,
  finishRideHandler,
);
