import { RideType } from "../types/ride.type";
import { ObjectId, WithId } from "mongodb";
import { rideCollection } from "../../db/mongo.db";
import { RideQueryInput } from "../types/ride-query-input.type";
import { RepositoryNotFoundError } from "../../core/errors/repository-not-found.error";

export const ridesRepository = {
  findMany: async (
    query: RideQueryInput,
  ): Promise<{ items: WithId<RideType>[]; totalCount: number }> => {
    const { pageSize, pageNumber, sortBy, sortDirection } = query;
    const filter = {};
    const skip = (pageNumber - 1) * pageSize;

    const [items, totalCount] = await Promise.all([
      rideCollection
        .find(filter)
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(pageSize)
        .toArray(),
      rideCollection.countDocuments(filter),
    ]);

    return { items, totalCount };
  },
  createRide: async (newRide: RideType): Promise<string> => {
    const insertResult = await rideCollection.insertOne(newRide);
    return insertResult.insertedId.toString();
  },
  findRidesByDriver: async (
    query: RideQueryInput,
    driverId: string,
  ): Promise<{ items: WithId<RideType>[]; totalCount: number }> => {
    const { pageSize, pageNumber, sortBy, sortDirection } = query;
    const filter = { "driver.id": driverId };
    const skip = (pageNumber - 1) * pageSize;

    const [items, totalCount] = await Promise.all([
      rideCollection
        .find(filter)
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(pageSize)
        .toArray(),
      rideCollection.countDocuments(filter),
    ]);
    return { items, totalCount };
  },
  findByIdOrFail: async (id: string): Promise<WithId<RideType>> => {
    const res = await rideCollection.findOne({ _id: new ObjectId(id) });
    if (!res) {
      throw new RepositoryNotFoundError("Ride not found");
    }
    return res;
  },
  findActiveRideByDriverId: async (
    driverId: string,
  ): Promise<WithId<RideType> | null> =>
    rideCollection.findOne({ driverId, finishedAt: null }),
  finishRide: async (id: string, finishedAt: Date): Promise<void> => {
    const updateResult = await rideCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          finishedAt,
          updatedAt: new Date(),
        },
      },
    );

    if (updateResult.matchedCount === 0) {
      throw new RepositoryNotFoundError("Ride not found");
    }

    return;
  },
};
