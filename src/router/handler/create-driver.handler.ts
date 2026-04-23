import { Response } from "express";
import { RequestWithBody } from "../../core/request-general.type";
import { CreateDriverModelType } from "../model/create-driver.model";
import { ErrorsResponse } from "../../core/errors.type";
import { HTTP_STATUS } from "../../core/http-status.type";
import { mockDb } from "../../db/mock.db";
import { createDriverValidation } from "../../validation/create-driver-validation";

export const createDriverHandler = (
  req: RequestWithBody<CreateDriverModelType>,
  res: Response<ErrorsResponse | DriverType>,
) => {
  const { body } = req;
  const errorsMessage: ErrorsResponse = { errorsMessages: [] };
  createDriverValidation(body, errorsMessage);

  if (errorsMessage.errorsMessages.length > 0) {
    res.status(HTTP_STATUS.BAD_REQUEST_400).send(errorsMessage);
    return;
  }

  const newDriver = {
    ...body,
    id: mockDb.drivers.length + 1,
    created: new Date().toISOString(),
  };

  mockDb.drivers.push(newDriver);

  res.sendStatus(HTTP_STATUS.CREATED_201);
};
