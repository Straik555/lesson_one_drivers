import { mockDb } from "../../db/mock.db";
import { DriverViewModel } from "../router/model/driver-view.model";
import { DriverType } from "../types/driver.type";

export const driversRepository = {
  getAll: (): DriverType[] => mockDb.drivers,
  getById: (id: number): DriverType | null =>
    mockDb.drivers.find((driver) => driver.id === id) ?? null,
  create: (newDriver: DriverType) => {
    mockDb.drivers.push(newDriver);
    return newDriver;
  },
  update: (id: number, updatedDriver: DriverViewModel) => {
    const driver = mockDb.drivers.find((driver) => driver.id === id);

    if (!driver) {
      return;
    }
    driver.name = updatedDriver.name;
    driver.phoneNumber = updatedDriver.phoneNumber;
    driver.email = updatedDriver.email;
    driver.vehicleMake = updatedDriver.vehicleMake;
    driver.vehicleModel = updatedDriver.vehicleModel;
    driver.vehicleYear = updatedDriver.vehicleYear;
    driver.vehicleLicensePlate = updatedDriver.vehicleLicensePlate;
    driver.vehicleDescription = updatedDriver.vehicleDescription;
    driver.vehicleFeatures = updatedDriver.vehicleFeatures;

    return;
  },
  delete: (id: number) => {
    const index = mockDb.drivers.findIndex((driver) => driver.id === id);

    if (index === -1) {
      return;
    }

    mockDb.drivers.splice(index, 1);
    return;
  },
};
