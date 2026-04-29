import { RideType } from "../../types/ride.type";

export type RideViewModel = {
  id: string;
} & Omit<RideType, "createdAt" | "updatedAt">;
