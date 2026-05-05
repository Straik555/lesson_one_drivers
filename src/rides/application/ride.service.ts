import { WithId } from "mongodb";
import { RideType } from "../types/ride.type";
import { ridesRepository } from "../repositories/rides.repository";
import { driversRepository } from "../../drivers/repositories/drivers.repository";
import { RideQueryInput } from "../types/ride-query-input.type";
import { RideAttributes } from "./dto/ride-attributes.dto";
import { DomainError } from "../../core/errors/domain.error";
import { DriverErrorCode } from "../../drivers/application/driver.service";

enum RideErrorCode {
  AlreadyFinished = "RIDE_ALREADY_FINISHED",
}

const rideService = {
  findMany: async (
    query: RideQueryInput,
  ): Promise<{ items: WithId<RideType>[]; totalCount: number }> =>
    await ridesRepository.findMany(query),
  findRidesByDriver: async (
    query: RideQueryInput,
    driverId: string,
  ): Promise<{ items: WithId<RideType>[]; totalCount: number }> => {
    await driversRepository.getByIdOrFail(driverId);

    return await ridesRepository.findRidesByDriver(query, driverId);
  },
  findByIdOrFail: async (id: string): Promise<WithId<RideType>> => {
    return ridesRepository.findByIdOrFail(id);
  },
  create: async (ride: RideAttributes): Promise<string> => {
    const driver = await driversRepository.getByIdOrFail(ride.driverId);

    const activeRide = await ridesRepository.findActiveRideByDriverId(
      ride.driverId,
    );
    if (activeRide) {
      throw new DomainError(
        "Driver has an active ride. Complete or cancel the ride first",
        DriverErrorCode.HasActiveRide,
      );
    }
    const newRide: RideType = {
      clientName: ride.clientName,
      driver: {
        id: ride.driverId,
        name: driver.name,
      },
      createdAt: new Date(),
      startedAt: new Date(),
      finishedAt: null,
      updatedAt: new Date(),
      price: ride.price,
      currency: ride.currency,
      addresses: {
        from: ride.fromAddress,
        to: ride.toAddress,
      },
      vehicle: {
        name: driver.vehicle.make + " " + driver.vehicle.model,
        licensePlate: driver.vehicle.licensePlate,
      },
    };
    return await ridesRepository.createRide(newRide);
  },
  finishRide: async (id: string): Promise<void> => {
    const ride = await ridesRepository.findByIdOrFail(id);

    if (ride.finishedAt) {
      throw new DomainError(
        `Ride is already finished at ${ride.finishedAt}`,
        RideErrorCode.AlreadyFinished,
      );
    }
    await ridesRepository.finishRide(id, new Date());
  },
};

export { rideService, RideErrorCode };
