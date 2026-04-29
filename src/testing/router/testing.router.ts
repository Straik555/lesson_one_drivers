import { Request, Response, Router } from "express";
import { HTTP_STATUS } from "../../core/types/http-status.type";

export const testingRouter = Router();

testingRouter.delete("/", (req: Request, res: Response) => {
  res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
});
