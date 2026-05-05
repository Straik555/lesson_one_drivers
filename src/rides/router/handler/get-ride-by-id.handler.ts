import { Response } from "express";
import { RequestWithParams } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id";
import { ErrorsResponse } from "../../../core/types/errors.type";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { RideOutput } from "../../output/ride.output.type";
import { rideService } from "../../application/ride.service";
import { mapToRideOutput } from "../mappers/map-to-ride-output.util";
import { errorsHandler } from "../../../core/errors/errors.handler";

export const getRideByIdHandler = async (
  req: RequestWithParams<UriParamsById>,
  res: Response<RideOutput | ErrorsResponse>,
) => {
  try {
    const { id } = req.params;

    const foundRide = await rideService.findByIdOrFail(id);

    const rideOutput: RideOutput = mapToRideOutput(foundRide);

    res.status(HTTP_STATUS.OK_200).send(rideOutput);
  } catch (error) {
    errorsHandler(error, res);
  }
};
