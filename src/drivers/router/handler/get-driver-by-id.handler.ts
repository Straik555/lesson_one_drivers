import { Response } from "express";
import { ErrorsResponse } from "../../../core/types/errors.type";
import { RequestWithParams } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { DriverType } from "../../types/driver.type";
import { WithId } from "mongodb";
import { errorsHandler } from "../../../core/errors/errors.handler";
import { driversService } from "../../application/driver.service";
import { DriverOutputType } from "../output/driver.output.type";
import { mapToDriverOutput } from "../mappers/map-to-driver-output.util";

export const getDriverByIdHandler = async (
  req: RequestWithParams<UriParamsById>,
  res: Response<DriverOutputType | ErrorsResponse>,
) => {
  try {
    const { id } = req.params;

    const foundDriver: WithId<DriverType> = await driversService.findById(id);
    const driverResult = mapToDriverOutput(foundDriver);
    res.status(HTTP_STATUS.OK_200).send(driverResult);
  } catch (error) {
    errorsHandler(error, res);
  }
};
