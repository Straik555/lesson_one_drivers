import { WithId } from "mongodb";
import { DriverType } from "../../types/driver.type";
import { DriverViewModel } from "../model/driver-view.model";

export const mapToDriverViewModelUtil = (
  driver: WithId<DriverType>,
): DriverViewModel => {
  return {
    id: driver._id.toString(),
    vehicle: driver.vehicle,
    email: driver.email,
    phoneNumber: driver.phoneNumber,
    name: driver.name,
    createdAt: driver.createdAt,
  };
};
