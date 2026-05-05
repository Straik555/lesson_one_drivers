import { Response } from "express";
import { RequestWithBody } from "../../../core/types/request-general.type";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { driversService } from "../../application/driver.service";
import { WithId } from "mongodb";
import { DriverType } from "../../types/driver.type";
import { DriverOutputType } from "../output/driver.output.type";
import { mapToDriverOutput } from "../mappers/map-to-driver-output.util";
import { DriverCreateInput } from "../../types/driver-create-input.type";
import { errorsHandler } from "../../../core/errors/errors.handler";

export const createDriverHandler = async (
  req: RequestWithBody<DriverCreateInput>,
  res: Response<DriverOutputType>,
) => {
  try {
    const { attributes } = req.body.data;

    const createdDriverId: string = await driversService.create(attributes);

    const createdDriver: WithId<DriverType> =
      await driversService.findById(createdDriverId);

    const driverResult: DriverOutputType = mapToDriverOutput(createdDriver);
    res.status(HTTP_STATUS.CREATED_201).json(driverResult);
  } catch (error) {
    errorsHandler(error, res);
  }
};
