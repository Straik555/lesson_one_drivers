import { DriverType } from "../types/driver.type";
import { ObjectId, WithId } from "mongodb";
import { driverCollection } from "../../db/mongo.db";
import { DriverInputDtoType } from "../application/dto/driver-input.dto";
import { RepositoryNotFoundError } from "../../core/errors/repository-not-found.error";
import { DriverQueryInput } from "../types/driver-query-input.type";

export const driversRepository = {
  findMany: async (
    query: DriverQueryInput,
  ): Promise<{ items: WithId<DriverType>[]; totalCount: number }> => {
    const {
      searchDriverEmailTerm,
      searchDriverNameTerm,
      searchVehicleMakeTerm,
      sortBy,
      sortDirection,
      pageSize,
      pageNumber,
    } = query;
    const skip = (pageNumber - 1) * pageSize;

    const filter: any = {};
    if (searchDriverNameTerm) {
      filter["name"] = { $regex: searchDriverNameTerm, $options: "i" };
    }

    if (searchDriverEmailTerm) {
      filter["email"] = { $regex: searchDriverEmailTerm, $options: "i" };
    }

    if (searchVehicleMakeTerm) {
      filter["vehicle.make"] = { $regex: searchVehicleMakeTerm, $options: "i" };
    }

    const items: WithId<DriverType>[] = await driverCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const totalCount = await driverCollection.countDocuments(filter);

    return { items, totalCount };
  },
  getAll: async (): Promise<WithId<DriverType>[]> =>
    driverCollection.find().toArray(),
  getById: async (id: string): Promise<WithId<DriverType> | null> =>
    (await driverCollection.findOne({ _id: new ObjectId(id) })) ?? null,
  getByIdOrFail: async (id: string): Promise<WithId<DriverType>> => {
    const res = await driverCollection.findOne({ _id: new ObjectId(id) });

    if (!res) {
      throw new RepositoryNotFoundError("Driver not found");
    }
    return res;
  },
  create: async (newDriver: DriverType): Promise<string> => {
    const insertResult = await driverCollection.insertOne(newDriver);
    return insertResult.insertedId.toString();
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
      throw new RepositoryNotFoundError("Driver not exist");
    }
    return;
  },
  delete: async (id: string): Promise<void> => {
    const deleteResult = await driverCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount < 1) {
      throw new RepositoryNotFoundError("Driver not exist");
    }
    return;
  },
};
