import { Response } from "express";
import { RequestWithBody } from "../../../core/types/request-general.type";
import { RideType } from "../../types/ride.type";
import { ErrorsResponse } from "../../../core/types/errors.type";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { createErrorMessages } from "../../../core/middlewares/validation/input-validation.middleware";
import { driversRepository } from "../../../drivers/repositories/drivers.repository";
import { ridesRepository } from "../../repositories/rides.repository";
import { RideInputDtoType } from "../../dto/ride-input.dto";
import { WithId } from "mongodb";
import { DriverType } from "../../../drivers/types/driver.type";
import { mapToRideViewModelUtil } from "../mappers/map-to-ride-view-model.util";
import { RideViewModel } from "../model/ride-view.model";

export const createRideHandler = async (
  req: RequestWithBody<RideInputDtoType>,
  res: Response<RideViewModel | ErrorsResponse>,
) => {
  try {
    const { body } = req;

    const driver: WithId<DriverType> | null = await driversRepository.getById(
      body.driverId,
    );

    if (!driver) {
      res.status(HTTP_STATUS.NOT_FOUND_404).json(
        createErrorMessages([
          {
            message: "The driver not found",
            field: "id",
          },
        ]),
      );
      return;
    }

    const activeRide: WithId<RideType> | null =
      await ridesRepository.findActiveRideByDriverId(body.driverId);

    if (activeRide) {
      res
        .status(HTTP_STATUS.BAD_REQUEST_400)
        .json(
          createErrorMessages([
            { field: "driverId", message: "The driver has no active ride" },
          ]),
        );
      return;
    }

    const newRide: RideType = {
      clientName: body.clientName,
      driver: {
        name: driver.name,
        id: body.driverId,
      },
      vehicle: {
        name: driver.vehicle.make + " " + driver.vehicle.model,
        licensePlate: driver.vehicle.licensePlate,
      },
      price: body.price,
      createdAt: new Date(),
      currency: body.currency,
      updatedAt: null,
      startedAt: new Date(),
      finishedAt: null,
      addresses: {
        from: body.fromAddress,
        to: body.toAddress,
      },
    };

    const createRide = await ridesRepository.createRide(newRide);

    const rideResult = mapToRideViewModelUtil(createRide);

    res.status(HTTP_STATUS.CREATED_201).send(rideResult);
  } catch (error) {
    res.sendStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR_500);
  }
};
