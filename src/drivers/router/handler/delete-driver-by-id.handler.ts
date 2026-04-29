import { Response } from "express";
import { RequestWithParams } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { driversRepository } from "../../repositories/drivers.repository";

export const deleteDriverByIdHandler = async (
  req: RequestWithParams<UriParamsById>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const foundDriver = await driversRepository.getById(id);
    if (!foundDriver) {
      res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
      return;
    }

    await driversRepository.delete(id);
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  } catch (error) {
    res.sendStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR_500);
  }
};
