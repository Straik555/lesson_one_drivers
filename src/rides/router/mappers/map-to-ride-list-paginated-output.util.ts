import { WithId } from "mongodb";
import { RideType } from "../../types/ride.type";
import { RideListPaginatedOutput } from "../../output/ride-list-paginated.output.type";
import { ResourceType } from "../../../core/types/resource.type";

export const mapToRideListPaginatedOutput = (
  rides: WithId<RideType>[],
  meta: { page: number; pageSize: number; totalCount: number },
): RideListPaginatedOutput => {
  return {
    meta: {
      page: meta.page,
      totalCount: meta.totalCount,
      pageSize: meta.pageSize,
      pageCount: Math.ceil(meta.totalCount / meta.pageSize),
    },
    data: rides.map((ride) => ({
      type: ResourceType.Rides,
      id: ride._id.toString(),
      attributes: {
        clientName: ride.clientName,
        driver: ride.driver,
        vehicle: ride.vehicle,
        price: ride.price,
        currency: ride.currency,
        startedAt: ride.startedAt,
        finishedAt: ride.finishedAt,
        addresses: ride.addresses,
      },
    })),
  };
};
