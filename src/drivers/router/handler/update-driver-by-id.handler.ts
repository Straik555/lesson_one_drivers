import { Response } from "express";
import { RequestWithParamsAndBody } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id";
import { ErrorsResponse } from "../../../core/types/errors.type";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { driversService } from "../../application/driver.service";
import { errorsHandler } from "../../../core/errors/errors.handler";
import { DriverUpdateInput } from "../../types/driver-update.type";
import { DriverOutputType } from "../output/driver.output.type";

export const updateDriverByIdHandler = async (
  req: RequestWithParamsAndBody<UriParamsById, DriverUpdateInput>,
  res: Response<DriverOutputType | ErrorsResponse>,
) => {
  try {
    const { id } = req.params;
    const { attributes } = req.body.data;

    await driversService.update(id, attributes);

    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  } catch (error) {
    errorsHandler(error, res);
  }
};
