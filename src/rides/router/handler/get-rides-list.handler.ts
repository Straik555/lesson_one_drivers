import { Request, Response } from "express";
import { RideType } from "../../types/ride.type";
import { ridesRepository } from "../../repositories/rides.repository";
import { HTTP_STATUS } from "../../../core/types/http-status.type";

export const getRidesListHandler = (
  req: Request,
  res: Response<RideType[]>,
) => {
  const ridesList = ridesRepository.getAll();
  res.status(HTTP_STATUS.OK_200).json(ridesList);
};
