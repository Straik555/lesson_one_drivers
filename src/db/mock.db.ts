type MockDbType = {
  drivers: DriverType[];
};

export const mockDb: MockDbType = {
  drivers: [
    {
      id: 1,
      created: "2026-04-20T17:18:29.127Z",
      name: "Valentin",
      phoneNumber: "123-456-7890",
      email: "valentin@example.com",
      vehicleMake: "BMW",
      vehicleModel: "X5",
      vehicleYear: 2021,
      vehicleLicensePlate: "ABC-123",
      vehicleDescription: null,
      vehicleFeatures: [],
    },
    {
      id: 2,
      created: "2026-04-21T17:18:29.127Z",
      name: "Valentin",
      phoneNumber: "123-456-7890",
      email: "valentin@example.com",
      vehicleMake: "BMW",
      vehicleModel: "X5",
      vehicleYear: 2021,
      vehicleLicensePlate: "ABC-123",
      vehicleDescription: null,
      vehicleFeatures: [],
    },
  ],
};
