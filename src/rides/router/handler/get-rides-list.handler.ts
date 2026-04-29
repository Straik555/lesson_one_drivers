import { Request, Response } from "express";
import { ridesRepository } from "../../repositories/rides.repository";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { mapToRideViewModelUtil } from "../mappers/map-to-ride-view-model.util";
import { RideViewModel } from "../model/ride-view.model";

export const getRidesListHandler = async (
  req: Request,
  res: Response<RideViewModel[]>,
) => {
  const ridesList = await ridesRepository.getAll();

  const rideResult = ridesList.map((ride) => mapToRideViewModelUtil(ride));

  res.status(HTTP_STATUS.OK_200).json(rideResult);
};
