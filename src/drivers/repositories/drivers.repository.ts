import { DriverType } from "../types/driver.type";
import { ObjectId, WithId } from "mongodb";
import { driverCollection } from "../../db/mongo.db";
import { DriverInputDtoType } from "../dto/driver-input.dto";

export const driversRepository = {
  getAll: async (): Promise<WithId<DriverType>[]> =>
    driverCollection.find().toArray(),
  getById: async (id: string): Promise<WithId<DriverType> | null> =>
    (await driverCollection.findOne({ _id: new ObjectId(id) })) ?? null,
  create: async (newDriver: DriverType): Promise<WithId<DriverType>> => {
    const insertResult = await driverCollection.insertOne(newDriver);
    return {
      ...newDriver,
      _id: insertResult.insertedId,
    };
  },
  update: async (id: string, dto: DriverInputDtoType): Promise<void> => {
    const updateResult = await driverCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: dto.name,
          phoneNumber: dto.phoneNumber,
          email: dto.email,
          vehicle: {
            make: dto.vehicleMake,
            description: dto.vehicleDescription,
            features: dto.vehicleFeatures,
            licensePlate: dto.vehicleLicensePlate,
            model: dto.vehicleModel,
            year: dto.vehicleYear,
          },
        },
      },
    );

    if (updateResult.matchedCount === 0) {
      throw new Error("Driver not found");
    }
    return;
  },
  delete: async (id: string): Promise<void> => {
    const deleteResult = await driverCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount < 1) {
      throw new Error("Driver not found");
    }
    return;
  },
};
