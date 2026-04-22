import { Response } from "express";
import { ErrorsResponse } from "../../core/errors.type";
import { RequestWithParams } from "../../core/request-general.type";
import { UriParamsById } from "../model/uri-params-by-id.model";
import { mockDb } from "../../db/mock.db";
import { HTTP_STATUS } from "../../core/http-status.type";
import { getErrors } from "../../utils/get-errors";

export const getDriverByIdHandler = (
  req: RequestWithParams<UriParamsById>,
  res: Response<DriverType | ErrorsResponse>,
) => {
  const { id } = req.params;
  const errorsResponse: ErrorsResponse = { errorsMessages: [] };

  const foundDriver = mockDb.drivers.find((driver) => driver.id === +id);

  if (!foundDriver) {
    getErrors(
      HTTP_STATUS.NOT_FOUND_404,
      Object.keys(req.params)[0],
      errorsResponse,
    );
    res.status(HTTP_STATUS.NOT_FOUND_404).send(errorsResponse);
    return;
  }

  res.status(HTTP_STATUS.OK_200).send(foundDriver);
};
