import { RideViewModel } from "../model/ride-view.model";
import { WithId } from "mongodb";
import { RideType } from "../../types/ride.type";

export const mapToRideViewModelUtil = (
  ride: WithId<RideType>,
): RideViewModel => {
  return {
    id: ride._id.toString(),
    clientName: ride.clientName,
    driver: ride.driver,
    vehicle: ride.vehicle,
    price: ride.price,
    currency: ride.currency,
    startedAt: ride.startedAt,
    finishedAt: ride.finishedAt,
    addresses: ride.addresses,
  };
};
