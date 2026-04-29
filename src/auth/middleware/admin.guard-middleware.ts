import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../core/types/http-status.type";
import { appConfig } from "../../core/configs/app.configs";

export const adminGuardMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const auth = req.headers.authorization as string;
  if (!auth) {
    res.sendStatus(HTTP_STATUS.UNAUTHORIZED_401);
    return;
  }

  const [authType, token] = auth.split(" ");

  if (authType !== "Basic") {
    res.sendStatus(HTTP_STATUS.UNAUTHORIZED_401);
    return;
  }
  const credentials = Buffer.from(token, "base64").toString("utf-8");
  const [username, password] = credentials.split(":");

  if (
    username !== appConfig.ADMIN_USERNAME ||
    password !== appConfig.ADMIN_PASSWORD
  ) {
    res.sendStatus(HTTP_STATUS.UNAUTHORIZED_401);
    return;
  }
  next();
};
