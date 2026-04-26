export enum VehicleFeature {
  WiFi = "wi-fi",
  ChildSeat = "child-seat",
  PetFriendly = "pet-friendly",
}

export type DriverType = {
  id: number;
  created: string;
  name: string;
  phoneNumber: string;
  email: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  vehicleLicensePlate: string;
  vehicleDescription: null | string;
  vehicleFeatures: VehicleFeature[];
};
