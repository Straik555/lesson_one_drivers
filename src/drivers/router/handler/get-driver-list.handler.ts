import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { driversRepository } from "../../repositories/drivers.repository";
import { DriverViewModel } from "../model/driver-view.model";
import { mapToDriverViewModelUtil } from "../mappers/map-to-driver-view-model.util";

export const getDriverListHandler = async (
  req: Request,
  res: Response<DriverViewModel[]>,
) => {
  const driverList = await driversRepository.getAll();
  const driverViewModel: DriverViewModel[] = driverList.map((driver) =>
    mapToDriverViewModelUtil(driver),
  );
  res.status(HTTP_STATUS.OK_200).send(driverViewModel);
};
