export enum VehicleFeature {
  WiFi = "wi-fi",
  ChildSeat = "child-seat",
  PetFriendly = "pet-friendly",
}

export type DriverType = {
  name: string;
  phoneNumber: string;
  email: string;
  vehicle: {
    make: string;
    model: string;
    year: number;
    licensePlate: string;
    description: string | null;
    features: VehicleFeature[];
  };
  createdAt: Date;
};
