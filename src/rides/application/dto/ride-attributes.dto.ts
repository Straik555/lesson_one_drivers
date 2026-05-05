import { Currency } from "../../types/ride.type";

export type RideAttributes = {
  clientName: string;
  price: number;
  currency: Currency;
  driverId: string;
  fromAddress: string;
  toAddress: string;
};
