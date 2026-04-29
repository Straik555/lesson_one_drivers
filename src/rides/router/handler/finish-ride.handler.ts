import { Response } from "express";
import { RequestWithParams } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id";
import { ErrorsResponse } from "../../../core/types/errors.type";
import { RideViewModel } from "../model/ride-view.model";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { ridesRepository } from "../../repositories/rides.repository";
import { createErrorMessages } from "../../../core/middlewares/validation/input-validation.middleware";

export const finishRideHandler = async (
  req: RequestWithParams<UriParamsById>,
  res: Response<ErrorsResponse | RideViewModel>,
) => {
  try {
    const { id } = req.params;
    const ride = await ridesRepository.getById(id);

    if (!ride) {
      res.status(HTTP_STATUS.NOT_FOUND_404).send(
        createErrorMessages([
          {
            field: "id",
            message: "Not found ride with that id",
          },
        ]),
      );
      return;
    }
    if (ride.finishedAt) {
      res.status(HTTP_STATUS.BAD_REQUEST_400).send(
        createErrorMessages([
          {
            field: id,
            message: "Ride already finished",
          },
        ]),
      );
      return;
    }

    await ridesRepository.finish(id, new Date());

    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  } catch (error) {
    res.sendStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR_500);
  }
};
