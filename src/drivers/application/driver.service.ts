import { driversRepository } from "../repositories/drivers.repository";
import { DriverType } from "../types/driver.type";
import { WithId } from "mongodb";
import { DriverInputDtoType } from "./dto/driver-input.dto";
import { ridesRepository } from "../../rides/repositories/rides.repository";
import { DomainError } from "../../core/errors/domain.error";
import { RideType } from "../../rides/types/ride.type";
import { DriverQueryInput } from "../types/driver-query-input.type";

enum DriverErrorCode {
  HasActiveRide = "DRIVER_HAS_ACTIVE_RIDE",
}

const driversService = {
  findMany: async (
    query: DriverQueryInput,
  ): Promise<{ items: WithId<DriverType>[]; totalCount: number }> =>
    await driversRepository.findMany(query),
  findById: async (id: string): Promise<WithId<DriverType>> =>
    await driversRepository.getByIdOrFail(id),
  create: async (driver: DriverInputDtoType): Promise<string> => {
    const newDriver: DriverType = {
      createdAt: new Date(),
      name: driver.name,
      email: driver.name,
      phoneNumber: driver.phoneNumber,
      vehicle: {
        make: driver.vehicleMake,
        description: driver.vehicleDescription,
        features: driver.vehicleFeatures,
        licensePlate: driver.vehicleLicensePlate,
        year: driver.vehicleYear,
        model: driver.vehicleModel,
      },
    };

    return await driversRepository.create(newDriver);
  },
  update: async (id: string, driver: DriverInputDtoType): Promise<void> => {
    await driversRepository.update(id, driver);
    return;
  },
  delete: async (id: string): Promise<void> => {
    const isActiveRider: WithId<RideType> | null =
      await ridesRepository.findActiveRideByDriverId(id);

    if (isActiveRider) {
      throw new DomainError(
        `Driver has an active ride. Complete or cancel the ride first`,
        DriverErrorCode.HasActiveRide,
      );
    }

    await driversRepository.delete(id);
    return;
  },
};

export { driversService, DriverErrorCode };
