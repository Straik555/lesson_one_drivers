import { Response } from "express";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { driversService } from "../../application/driver.service";
import { errorsHandler } from "../../../core/errors/errors.handler";
import { RequestWithQuery } from "../../../core/types/request-general.type";
import { DriverQueryInput } from "../../types/driver-query-input.type";
import { matchedData } from "express-validator";
import { setDefaultSortAndPagination } from "../../../core/helpers/set-default-sort-and-pagination.helper";
import { mapToDriverListPaginatedOutput } from "../mappers/map-to-driver-list-paginated-output.util";
import { DriverListPaginatedOutput } from "../output/driver-list-paginated.output.type";

export const getDriverListHandler = async (
  req: RequestWithQuery<DriverQueryInput>,
  res: Response<DriverListPaginatedOutput>,
) => {
  try {
    const sanitizedQuery = matchedData<DriverQueryInput>(req, {
      locations: ["query"],
      includeOptionals: true,
    });
    const queryInput = setDefaultSortAndPagination(sanitizedQuery);
    const { items, totalCount } = await driversService.findMany(queryInput);

    const driverListOutput: DriverListPaginatedOutput =
      mapToDriverListPaginatedOutput(items, {
        page: queryInput.pageNumber,
        pageSize: queryInput.pageSize,
        totalCount,
      });
    res.status(HTTP_STATUS.OK_200).send(driverListOutput);
  } catch (error) {
    errorsHandler(error, res);
  }
};
