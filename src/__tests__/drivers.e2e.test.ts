import { app } from "../";
import { routerPath } from "../core/path/paths";
import request from "supertest";
import { createDriverManager } from "./utils/create-driver-test-manager";
import { HTTP_STATUS } from "../core/types/http-status.type";
import { DriverType } from "../drivers/types/driver.type";

const correctData = {
  name: "Valentin",
  phoneNumber: "123-456-7890",
  email: "valentin@example.com",
  vehicleMake: "BMW",
  vehicleModel: "X5",
  vehicleYear: 2021,
  vehicleLicensePlate: "ABC-123",
  vehicleDescription: null,
  vehicleFeatures: [],
};
let createdFirstDriver: DriverType | undefined;

describe("/drivers", () => {
  beforeAll(async () => {
    await request(app).delete(routerPath["testing/all-data"]);
  });

  it("should return 200 and empty []", async () => {
    await request(app).get(routerPath.drivers).expect(HTTP_STATUS.OK_200, []);
  });

  it("should return 201 created with correct data", async () => {
    const { createdEntity } =
      await createDriverManager.createDriver(correctData);
    createdFirstDriver = createdEntity;
    // expect(response.status).toBe(HTTP_STATUS.CREATED_201);
    //
    // expect(createdFirstDriver).toEqual(response.body);

    await request(app)
      .get(routerPath.drivers)
      .expect(HTTP_STATUS.OK_200, [createdFirstDriver]);
  });

  afterAll((done) => {
    done();
  });
});
