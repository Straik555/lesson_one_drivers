import { Response } from "express";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { errorsHandler } from "../../../core/errors/errors.handler";
import { RequestWithQuery } from "../../../core/types/request-general.type";
import { RideQueryInput } from "../../types/ride-query-input.type";
import { RideListPaginatedOutput } from "../../output/ride-list-paginated.output.type";
import { matchedData } from "express-validator";
import { setDefaultSortAndPagination } from "../../../core/helpers/set-default-sort-and-pagination.helper";
import { rideService } from "../../application/ride.service";
import { mapToRideListPaginatedOutput } from "../mappers/map-to-ride-list-paginated-output.util";

export const getRidesListHandler = async (
  req: RequestWithQuery<RideQueryInput>,
  res: Response<RideListPaginatedOutput>,
) => {
  try {
    const sanitizedQuery = matchedData<RideQueryInput>(req, {
      locations: ["query"],
      includeOptionals: true,
    });

    const queryInput = setDefaultSortAndPagination(sanitizedQuery);

    const { items, totalCount } = await rideService.findMany(queryInput);

    const rideListOutput = mapToRideListPaginatedOutput(items, {
      page: queryInput.pageNumber,
      pageSize: queryInput.pageSize,
      totalCount,
    });

    res.status(HTTP_STATUS.OK_200).json(rideListOutput);
  } catch (error) {
    errorsHandler(error, res);
  }
};
