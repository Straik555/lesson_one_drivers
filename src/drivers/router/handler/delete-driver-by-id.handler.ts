import { Response } from "express";
import { RequestWithParams } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { driversRepository } from "../../repositories/drivers.repository";

export const deleteDriverByIdHandler = (
  req: RequestWithParams<UriParamsById>,
  res: Response,
) => {
  const { id } = req.params;

  const foundDriver = driversRepository.getById(+id);
  if (!id || !foundDriver) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    return;
  }

  driversRepository.delete(+id);
  res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
};
