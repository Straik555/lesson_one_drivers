import { Request, Response, Router } from "express";
import { mockDb } from "../db/mock.db";
import { HTTP_STATUS } from "../core/http-status.type";

export const testingRouter = Router();

testingRouter.get("/", (req: Request, res: Response) => {
  mockDb.drivers = [];
  res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
});
