import { Router } from "express";
import { getDriverListHandler } from "./handler/get-driver-list.handler";
import { getDriverByIdHandler } from "./handler/get-driver-by-id.handler";
import { createDriverHandler } from "./handler/create-driver.handler";
import { updateDriverByIdHandler } from "./handler/update-driver-by-id.handler";
import { deleteDriverByIdHandler } from "./handler/delete-driver-by-id.handler";

export const driversRouter = Router();

driversRouter
  .get("/", getDriverListHandler)
  .get("/:id", getDriverByIdHandler)
  .post("/", createDriverHandler)
  .put("/:id", updateDriverByIdHandler)
  .delete("/:id", deleteDriverByIdHandler);
