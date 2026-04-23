import { CreateUpdateDriverModel } from "../router/model/create-update-driver.model";

export const getUpdateDriver = (
  dbDriver: DriverType,
  updatedDriver: CreateUpdateDriverModel,
) => {
  dbDriver.name = updatedDriver.name;
  dbDriver.vehicleYear = updatedDriver.vehicleYear;
  dbDriver.vehicleModel = updatedDriver.vehicleModel;
  dbDriver.email = updatedDriver.email;
  dbDriver.vehicleMake = updatedDriver.vehicleMake;
  dbDriver.vehicleLicensePlate = updatedDriver.vehicleLicensePlate;
  dbDriver.vehicleFeatures = updatedDriver.vehicleFeatures;
  dbDriver.phoneNumber = updatedDriver.phoneNumber;
  dbDriver.vehicleDescription = updatedDriver.vehicleDescription;
};
