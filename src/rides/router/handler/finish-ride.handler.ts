import { Response } from "express";
import { RequestWithParams } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id";
import { ErrorsResponse } from "../../../core/types/errors.type";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { RideOutput } from "../../output/ride.output.type";
import { rideService } from "../../application/ride.service";
import { errorsHandler } from "../../../core/errors/errors.handler";

export const finishRideHandler = async (
  req: RequestWithParams<UriParamsById>,
  res: Response<ErrorsResponse | RideOutput>,
) => {
  try {
    const { id } = req.params;

    await rideService.finishRide(id);

    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  } catch (error) {
    errorsHandler(error, res);
  }
};
