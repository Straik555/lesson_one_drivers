import { Response } from "express";
import { RequestWithParamsAndBody } from "../../core/request-general.type";
import { UriParamsById } from "../model/uri-params-by-id.model";
import { CreateUpdateDriverModel } from "../model/create-update-driver.model";
import { ErrorsResponse } from "../../core/errors.type";
import { mockDb } from "../../db/mock.db";
import { HTTP_STATUS } from "../../core/http-status.type";
import { createUpdateDriverValidation } from "../../validation/create-update-driver-validation";
import { getUpdateDriver } from "../../utils/get-update-driver";

export const updateDriverByIdHandler = (
  req: RequestWithParamsAndBody<UriParamsById, CreateUpdateDriverModel>,
  res: Response<DriverType | ErrorsResponse>,
) => {
  const { id } = req.params;
  const { body } = req;
  const errorsMessage: ErrorsResponse = { errorsMessages: [] };

  const foundDriver = mockDb.drivers.find((driver) => driver.id === +id);

  if (!foundDriver) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    return;
  }

  createUpdateDriverValidation(body, errorsMessage);

  if (errorsMessage.errorsMessages.length > 0) {
    res.status(HTTP_STATUS.BAD_REQUEST_400).json(errorsMessage);
    return;
  }

  getUpdateDriver(foundDriver, body);
  res.status(HTTP_STATUS.OK_200).json(foundDriver);
};
