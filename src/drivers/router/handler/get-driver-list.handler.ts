import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { driversRepository } from "../../repositories/drivers.repository";
import { DriverType } from "../../types/driver.type";

export const getDriverListHandler = (
  req: Request,
  res: Response<DriverType[]>,
) => {
  const driverList = driversRepository.getAll();
  res.status(HTTP_STATUS.OK_200).send(driverList);
};
