import express, { Express } from "express";
import { driversRouter } from "./drivers/router/drivers.router";
import { routerPath } from "./core/path/paths";
import { testingRouter } from "./testing/router/testing.router";
import { setupSwagger } from "./core/swagger/setup-swagger";
import { ridesRouter } from "./rides/router/rides.router";

const jsonBodyMiddleware = express.json();
export const setupApp = (app: Express) => {
  app.use(jsonBodyMiddleware);

  app.get("/", (req, res) => {
    res.send("Back End");
  });

  app.use(routerPath.drivers, driversRouter);
  app.use(routerPath.rides, ridesRouter);
  app.use(routerPath["testing/all-data"], testingRouter);

  setupSwagger(app);

  return app;
};
