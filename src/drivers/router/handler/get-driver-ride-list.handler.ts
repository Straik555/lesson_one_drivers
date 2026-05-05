import { Response } from "express";
import { RequestWithQueryAndParams } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id";
import { RideQueryInput } from "../../../rides/types/ride-query-input.type";
import { errorsHandler } from "../../../core/errors/errors.handler";
import { rideService } from "../../../rides/application/ride.service";
import { mapToRideListPaginatedOutput } from "../../../rides/router/mappers/map-to-ride-list-paginated-output.util";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { RideListPaginatedOutput } from "../../../rides/output/ride-list-paginated.output.type";

export const getDriverRideListHandler = async (
  req: RequestWithQueryAndParams<RideQueryInput, UriParamsById>,
  res: Response<RideListPaginatedOutput>,
) => {
  try {
    const { id } = req.params;
    const queryInput = req.query;

    const { items, totalCount } = await rideService.findRidesByDriver(
      queryInput,
      id,
    );
    const rideListOutput: RideListPaginatedOutput =
      mapToRideListPaginatedOutput(items, {
        page: queryInput.pageNumber,
        pageSize: queryInput.pageSize,
        totalCount,
      });
    res.status(HTTP_STATUS.OK_200).send(rideListOutput);
  } catch (error: unknown) {
    errorsHandler(error, res);
  }
};
