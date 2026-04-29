import { Response } from "express";
import { RequestWithBody } from "../../../core/types/request-general.type";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { driversRepository } from "../../repositories/drivers.repository";
import { DriverType } from "../../types/driver.type";
import { WithId } from "mongodb";
import { DriverInputDtoType } from "../../dto/driver-input.dto";
import { mapToDriverViewModelUtil } from "../mappers/map-to-driver-view-model.util";
import { DriverViewModel } from "../model/driver-view.model";

export const createDriverHandler = async (
  req: RequestWithBody<DriverInputDtoType>,
  res: Response<DriverViewModel>,
) => {
  try {
    const { body } = req;

    const newDriver: DriverType = {
      createdAt: new Date(),
      name: body.name,
      email: body.name,
      phoneNumber: body.phoneNumber,
      vehicle: {
        make: body.vehicleMake,
        description: body.vehicleDescription,
        features: body.vehicleFeatures,
        licensePlate: body.vehicleLicensePlate,
        year: body.vehicleYear,
        model: body.vehicleModel,
      },
    };

    const newDriverCreated: WithId<DriverType> =
      await driversRepository.create(newDriver);
    const driverResult: DriverViewModel =
      mapToDriverViewModelUtil(newDriverCreated);
    res.status(HTTP_STATUS.CREATED_201).json(driverResult);
  } catch (error) {
    res.sendStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR_500);
  }
};
