import { WithId } from "mongodb";
import { RideType } from "../../types/ride.type";
import { RideOutput } from "../../output/ride.output.type";
import { ResourceType } from "../../../core/types/resource.type";

export function mapToRideOutput(ride: WithId<RideType>): RideOutput {
  return {
    data: {
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
    },
  };
}
