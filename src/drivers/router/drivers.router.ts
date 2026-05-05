import { Router } from "express";
import { getDriverListHandler } from "./handler/get-driver-list.handler";
import { getDriverByIdHandler } from "./handler/get-driver-by-id.handler";
import { createDriverHandler } from "./handler/create-driver.handler";
import { updateDriverByIdHandler } from "./handler/update-driver-by-id.handler";
import { deleteDriverByIdHandler } from "./handler/delete-driver-by-id.handler";
import {
  driverCreateInputValidation,
  driverUpdateInputValidation,
} from "../validation/driver-input-validation";
import { paramsIdValidationMiddleware } from "../../core/middlewares/validation/params-id-validation.middleware";
import { inputValidationMiddleware } from "../../core/middlewares/validation/input-validation.middleware";
import { adminGuardMiddleware } from "../../auth/middleware/admin.guard-middleware";
import { paginationAndSortingValidation } from "../../core/middlewares/validation/query-pagination-sorting-validation.middleware";
import { DriverSortField } from "../types/driver-sort-field.type";
import { getDriverRideListHandler } from "./handler/get-driver-ride-list.handler";
import { RideSortField } from "../../rides/types/ride-sort-field.type";
import { driverQueryValidation } from "../validation/driver-query-validation";

export const driversRouter = Router();

driversRouter.use(adminGuardMiddleware);

driversRouter
  .get(
    "/",
    paginationAndSortingValidation(DriverSortField, driverQueryValidation),
    inputValidationMiddleware,
    getDriverListHandler,
  )
  .get(
    "/:id",
    paramsIdValidationMiddleware,
    inputValidationMiddleware,
    getDriverByIdHandler,
  )
  .get(
    "/:id/rides",
    paramsIdValidationMiddleware,
    paginationAndSortingValidation(RideSortField),
    inputValidationMiddleware,
    getDriverRideListHandler,
  )
  .post(
    "/",
    driverCreateInputValidation,
    inputValidationMiddleware,
    createDriverHandler,
  )
  .put(
    "/:id",
    paramsIdValidationMiddleware,
    driverUpdateInputValidation,
    inputValidationMiddleware,
    updateDriverByIdHandler,
  )
  .delete(
    "/:id",
    paramsIdValidationMiddleware,
    inputValidationMiddleware,
    deleteDriverByIdHandler,
  );
