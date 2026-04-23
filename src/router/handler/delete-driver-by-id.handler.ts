import { Response } from "express";
import { RequestWithParams } from "../../core/request-general.type";
import { UriParamsById } from "../model/uri-params-by-id.model";
import { mockDb } from "../../db/mock.db";
import { HTTP_STATUS } from "../../core/http-status.type";

export const deleteDriverByIdHandler = (
  req: RequestWithParams<UriParamsById>,
  res: Response,
) => {
  const { id } = req.params;

  const foundDriver = mockDb.drivers.find((driver) => driver.id === +id);
  if (!id || !foundDriver) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    return;
  }

  mockDb.drivers = mockDb.drivers.filter((driver) => driver.id !== +id);
  res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
};
