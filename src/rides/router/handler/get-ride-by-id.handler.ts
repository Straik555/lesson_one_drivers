import { Response } from "express";
import { RequestWithParams } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id";
import { RideType } from "../../types/ride.type";
import { ridesRepository } from "../../repositories/rides.repository";
import { ErrorsResponse } from "../../../core/types/errors.type";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { createErrorMessages } from "../../../core/middlewares/validation/input-validation.middleware";

export const getRideByIdHandler = (
  req: RequestWithParams<UriParamsById>,
  res: Response<RideType | ErrorsResponse>,
) => {
  const { id } = req.params;

  const foundRide = ridesRepository.getById(+id);

  if (!foundRide) {
    res.status(HTTP_STATUS.NOT_FOUND_404).send(
      createErrorMessages([
        {
          message: "Not found ride with that id",
          field: "id",
        },
      ]),
    );

    return;
  }

  res.status(HTTP_STATUS.OK_200).send(foundRide);
};
