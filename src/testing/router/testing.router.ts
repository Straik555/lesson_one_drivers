import { Request, Response, Router } from "express";
import { HTTP_STATUS } from "../../core/types/http-status.type";
import { driverCollection, rideCollection } from "../../db/mongo.db";

export const testingRouter = Router();

testingRouter.delete("/", async (req: Request, res: Response) => {
  await Promise.all([
    rideCollection.deleteMany(),
    driverCollection.deleteMany(),
  ]);

  res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
});
