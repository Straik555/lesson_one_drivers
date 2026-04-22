import { Router } from "express";
import { getDriverListHandler } from "./handler/get-driver-list.handler";
import { getDriverByIdHandler } from "./handler/get-driver-by-id.handler";

export const driversRouter = Router();

driversRouter.get("/", getDriverListHandler).get("/:id", getDriverByIdHandler);
