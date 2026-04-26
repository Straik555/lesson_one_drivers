import { RideType } from "../types/ride.type";
import { mockDb } from "../../db/mock.db";

export const ridesRepository = {
  getAll: (): RideType[] => mockDb.rides,
  getById: (id: number): RideType | null =>
    mockDb.rides.find((ride) => ride.id === id) ?? null,
  createRide: (newRide: RideType) => {
    mockDb.rides.push(newRide);
    return newRide;
  },
};
