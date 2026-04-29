import { RideType } from "../types/ride.type";
import { ObjectId, WithId } from "mongodb";
import { rideCollection } from "../../db/mongo.db";

export const ridesRepository = {
  getAll: async (): Promise<WithId<RideType>[]> =>
    rideCollection.find().toArray(),
  getById: async (id: string): Promise<WithId<RideType> | null> =>
    await rideCollection.findOne({ _id: new ObjectId(id) }),
  createRide: async (newRide: RideType): Promise<WithId<RideType>> => {
    const insertResult = await rideCollection.insertOne(newRide);
    return {
      ...newRide,
      _id: insertResult.insertedId,
    };
  },
  findActiveRideByDriverId: async (
    driverId: string,
  ): Promise<WithId<RideType> | null> =>
    rideCollection.findOne({ driverId, finishedAt: null }),
  finish: async (id: string, finishedAt: Date): Promise<void> => {
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
      throw new Error("Ride not found");
    }

    return;
  },
};
