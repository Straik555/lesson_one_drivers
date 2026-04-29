import { Response } from "express";
import { ErrorsResponse } from "../../../core/types/errors.type";
import { RequestWithParams } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { driversRepository } from "../../repositories/drivers.repository";
import { createErrorMessages } from "../../../core/middlewares/validation/input-validation.middleware";
import { DriverType } from "../../types/driver.type";
import { DriverViewModel } from "../model/driver-view.model";
import { mapToDriverViewModelUtil } from "../mappers/map-to-driver-view-model.util";
import { WithId } from "mongodb";

export const getDriverByIdHandler = async (
  req: RequestWithParams<UriParamsById>,
  res: Response<DriverViewModel | ErrorsResponse>,
) => {
  try {
    const { id } = req.params;

    const foundDriver: WithId<DriverType> | null =
      await driversRepository.getById(id);

    if (!foundDriver) {
      res.status(HTTP_STATUS.NOT_FOUND_404).send(
        createErrorMessages([
          {
            message: `Not found driver with that id`,
            field: "id",
          },
        ]),
      );
      return;
    }
    const driverResult = mapToDriverViewModelUtil(foundDriver);
    res.status(HTTP_STATUS.OK_200).send(driverResult);
  } catch (error) {
    res.sendStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR_500);
  }
};
