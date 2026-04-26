import { Response } from "express";
import { RequestWithBody } from "../../../core/types/request-general.type";
import { DriverViewModel } from "../model/driver-view.model";
import { ErrorsResponse } from "../../../core/types/errors.type";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { mockDb } from "../../../db/mock.db";
import { driversRepository } from "../../repositories/drivers.repository";
import { DriverType } from "../../types/driver.type";

export const createDriverHandler = (
  req: RequestWithBody<DriverViewModel>,
  res: Response<ErrorsResponse | DriverType>,
) => {
  const { body } = req;

  const newDriver = {
    ...body,
    id: mockDb.drivers.length + 1,
    created: new Date().toISOString(),
  };
  driversRepository.create(newDriver);

  res.sendStatus(HTTP_STATUS.CREATED_201);
};
