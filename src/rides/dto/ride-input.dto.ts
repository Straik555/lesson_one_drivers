import { Currency } from "../types/ride.type";

export type RideInputDtoType = {
  clientName: string;
  price: number;
  currency: Currency;
  driverId: string;
  fromAddress: string;
  toAddress: string;
};
