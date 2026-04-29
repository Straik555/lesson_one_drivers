import { Response } from "express";
import { RequestWithParamsAndBody } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id";
import { DriverViewModel } from "../model/driver-view.model";
import { ErrorsResponse } from "../../../core/types/errors.type";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { driversRepository } from "../../repositories/drivers.repository";
import { DriverInputDtoType } from "../../dto/driver-input.dto";

export const updateDriverByIdHandler = async (
  req: RequestWithParamsAndBody<UriParamsById, DriverInputDtoType>,
  res: Response<DriverViewModel | ErrorsResponse>,
) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const foundDriver = await driversRepository.getById(id);

    if (!foundDriver) {
      res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
      return;
    }

    await driversRepository.update(id, body);

    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  } catch (error) {
    res.sendStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR_500);
  }
};
