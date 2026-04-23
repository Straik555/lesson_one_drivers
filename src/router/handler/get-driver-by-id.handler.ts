import { Response } from "express";
import { ErrorsResponse } from "../../core/errors.type";
import { RequestWithParams } from "../../core/request-general.type";
import { UriParamsById } from "../model/uri-params-by-id.model";
import { mockDb } from "../../db/mock.db";
import { HTTP_STATUS } from "../../core/http-status.type";

export const getDriverByIdHandler = (
  req: RequestWithParams<UriParamsById>,
  res: Response<DriverType | ErrorsResponse>,
) => {
  const { id } = req.params;

  const foundDriver = mockDb.drivers.find((driver) => driver.id === +id);

  if (!foundDriver) {
    res.status(HTTP_STATUS.NOT_FOUND_404).send({
      errorsMessages: [
        {
          field: "id",
          message: `The id is invalid`,
        },
      ],
    });
    return;
  }

  res.status(HTTP_STATUS.OK_200).send(foundDriver);
};
