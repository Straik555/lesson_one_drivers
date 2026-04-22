import { Request, Response } from "express";
import { HTTP_STATUS } from "../../core/http-status.type";
import { mockDb } from "../../db/mock.db";

export const getDriverListHandler = (
  req: Request,
  res: Response<DriverType[]>,
) => {
  res.status(HTTP_STATUS.OK_200).send(mockDb.drivers);
};
