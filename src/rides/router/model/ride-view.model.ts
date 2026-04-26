import { RideType } from "../../types/ride.type";

export type RideViewModel = {
  fromAddress: string;
  toAddress: string;
} & Pick<RideType, "clientName" | "price" | "currency" | "driverId">;
