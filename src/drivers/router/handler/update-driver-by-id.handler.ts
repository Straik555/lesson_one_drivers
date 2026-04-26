import { Response } from "express";
import { RequestWithParamsAndBody } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id";
import { DriverViewModel } from "../model/driver-view.model";
import { ErrorsResponse } from "../../../core/types/errors.type";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { driversRepository } from "../../repositories/drivers.repository";
import { DriverType } from "../../types/driver.type";

export const updateDriverByIdHandler = (
  req: RequestWithParamsAndBody<UriParamsById, DriverViewModel>,
  res: Response<DriverType | ErrorsResponse>,
) => {
  const { id } = req.params;
  const { body } = req;

  const foundDriver = driversRepository.getById(+id);

  if (!foundDriver) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    return;
  }

  driversRepository.update(+id, body);

  res.status(HTTP_STATUS.NO_CONTENT_204);
};
