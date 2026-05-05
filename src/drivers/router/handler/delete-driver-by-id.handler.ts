import { Response } from "express";
import { RequestWithParams } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { driversService } from "../../application/driver.service";
import { errorsHandler } from "../../../core/errors/errors.handler";

export const deleteDriverByIdHandler = async (
  req: RequestWithParams<UriParamsById>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    await driversService.delete(id);
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  } catch (error) {
    errorsHandler(error, res);
  }
};
