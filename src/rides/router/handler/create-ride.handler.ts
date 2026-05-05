import { Response } from "express";
import { RequestWithBody } from "../../../core/types/request-general.type";
import { ErrorsResponse } from "../../../core/types/errors.type";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { RideInputDtoType } from "../../application/dto/ride-input.dto";
import { RideOutput } from "../../output/ride.output.type";
import { rideService } from "../../application/ride.service";
import { mapToRideOutput } from "../mappers/map-to-ride-output.util";
import { errorsHandler } from "../../../core/errors/errors.handler";

export const createRideHandler = async (
  req: RequestWithBody<RideInputDtoType>,
  res: Response<RideOutput | ErrorsResponse>,
) => {
  try {
    const { body } = req;

    const createdRideId: string = await rideService.create(body);

    const createdRide = await rideService.findByIdOrFail(createdRideId);

    const rideOutput = mapToRideOutput(createdRide);

    res.status(HTTP_STATUS.CREATED_201).send(rideOutput);
  } catch (error) {
    errorsHandler(error, res);
  }
};
