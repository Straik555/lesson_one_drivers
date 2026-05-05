import { WithId } from "mongodb";
import { DriverType } from "../../types/driver.type";
import { PaginatedOutput } from "../../../core/types/pagination-output.type";
import { DriverListPaginatedOutput } from "../output/driver-list-paginated.output.type";
import { DriverDataOutput } from "../output/driver-data.output.type";
import { ResourceType } from "../../../core/types/resource.type";

export const mapToDriverListPaginatedOutput = (
  drivers: WithId<DriverType>[],
  meta: Omit<PaginatedOutput, "pageCount">,
): DriverListPaginatedOutput => ({
  meta: {
    page: meta.page,
    pageSize: meta.pageSize,
    pageCount: Math.ceil(meta.totalCount / meta.pageSize),
    totalCount: meta.totalCount,
  },
  data: drivers.map(
    (driver): DriverDataOutput => ({
      type: ResourceType.Drivers,
      id: driver._id.toString(),
      attributes: {
        name: driver.name,
        createdAt: driver.createdAt,
        email: driver.email,
        vehicle: driver.vehicle,
        phoneNumber: driver.phoneNumber,
      },
    }),
  ),
});
