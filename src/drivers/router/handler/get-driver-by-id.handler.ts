import { Response } from "express";
import { ErrorsResponse } from "../../../core/types/errors.type";
import { RequestWithParams } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { driversRepository } from "../../repositories/drivers.repository";
import { createErrorMessages } from "../../../core/middlewares/validation/input-validation.middleware";
import { DriverType } from "../../types/driver.type";

export const getDriverByIdHandler = (
  req: RequestWithParams<UriParamsById>,
  res: Response<DriverType | ErrorsResponse>,
) => {
  const { id } = req.params;

  const foundDriver: DriverType | null = driversRepository.getById(+id);
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

  res.status(HTTP_STATUS.OK_200).send(foundDriver);
};
