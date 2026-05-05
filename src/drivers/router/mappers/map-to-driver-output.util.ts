import { WithId } from "mongodb";
import { DriverType } from "../../types/driver.type";
import { DriverOutputType } from "../output/driver.output.type";
import { ResourceType } from "../../../core/types/resource.type";

export const mapToDriverOutput = (
  driver: WithId<DriverType>,
): DriverOutputType => ({
  data: {
    type: ResourceType.Drivers,
    id: driver._id.toString(),
    attributes: {
      vehicle: driver.vehicle,
      phoneNumber: driver.phoneNumber,
      email: driver.email,
      name: driver.name,
      createdAt: driver.createdAt,
    },
  },
});
