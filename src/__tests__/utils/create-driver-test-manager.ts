import request from "supertest";
import { DriverViewModel } from "../../drivers/router/model/driver-view.model";
import { HTTP_STATUS } from "../../core/types/http-status.type";
import { routerPath } from "../../core/path/paths";
import { app } from "../../index";
import { DriverType } from "../../drivers/types/driver.type";

export const createDriverManager = {
  createDriver: async (
    body: DriverViewModel,
    expectedStatusCode: HTTP_STATUS = HTTP_STATUS.CREATED_201,
  ) => {
    const response = await request(app)
      .post(routerPath.drivers)
      .send(body)
      .expect(expectedStatusCode);

    let createdEntity: undefined | DriverType = undefined;
    if (expectedStatusCode === HTTP_STATUS.CREATED_201) {
      createdEntity = response.body;
      const responseData: DriverType = {
        id: expect.any(Number),
        created: new Date().toISOString(),
        ...body,
      };
      console.log("response", responseData);
      console.log("createdEntity", response.body);
      expect(createdEntity).toEqual(responseData);
    }
    return { response, createdEntity };
  },
};
