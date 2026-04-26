import { Router } from "express";
import { getDriverListHandler } from "./handler/get-driver-list.handler";
import { getDriverByIdHandler } from "./handler/get-driver-by-id.handler";
import { createDriverHandler } from "./handler/create-driver.handler";
import { updateDriverByIdHandler } from "./handler/update-driver-by-id.handler";
import { deleteDriverByIdHandler } from "./handler/delete-driver-by-id.handler";
import { driverInputValidation } from "../validation/driver-input-validation";
import { paramsIdValidationMiddleware } from "../../core/middlewares/validation/params-id-validation.middleware";
import { inputValidationMiddleware } from "../../core/middlewares/validation/input-validation.middleware";
import { adminGuardMiddleware } from "../../auth/middleware/admin.guard-middleware";

export const driversRouter = Router();

driversRouter.use(adminGuardMiddleware);

driversRouter
  .get("/", getDriverListHandler)
  .get(
    "/:id",
    paramsIdValidationMiddleware,
    inputValidationMiddleware,
    getDriverByIdHandler,
  )
  .post(
    "/",
    driverInputValidation,
    inputValidationMiddleware,
    createDriverHandler,
  )
  .put(
    "/:id",
    paramsIdValidationMiddleware,
    driverInputValidation,
    inputValidationMiddleware,
    updateDriverByIdHandler,
  )
  .delete(
    "/:id",
    paramsIdValidationMiddleware,
    inputValidationMiddleware,
    deleteDriverByIdHandler,
  );
