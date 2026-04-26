import { Response } from "express";
import { RequestWithBody } from "../../../core/types/request-general.type";
import { RideViewModel } from "../model/ride-view.model";
import { Currency, RideType } from "../../types/ride.type";
import { ErrorsResponse } from "../../../core/types/errors.type";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { createErrorMessages } from "../../../core/middlewares/validation/input-validation.middleware";
import { driversRepository } from "../../../drivers/repositories/drivers.repository";
import { mockDb } from "../../../db/mock.db";
import { ridesRepository } from "../../repositories/rides.repository";

export const createRideHandler = (
  req: RequestWithBody<RideViewModel>,
  res: Response<RideType | ErrorsResponse>,
) => {
  const { body } = req;

  const driver = driversRepository.getById(+body.driverId);

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

  const newRide: RideType = {
    id: mockDb.rides.length ? mockDb.rides[mockDb.rides.length - 1].id + 1 : 1,
    clientName: body.clientName,
    driverId: body.driverId,
    driverName: driver.name,
    vehicleLicensePlate: driver.vehicleLicensePlate,
    vehicleName: driver.vehicleMake + " " + driver.vehicleModel,
    price: body.price,
    currency: body.currency.toLowerCase() as Currency,
    createdAt: new Date(),
    updatedAt: null,
    addresses: {
      from: body.fromAddress,
      to: body.toAddress,
    },
  };
  ridesRepository.createRide(newRide);
  res.status(HTTP_STATUS.CREATED_201).send(newRide);
};
