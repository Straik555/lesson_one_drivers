import express, { Express } from "express";
import { driversRouter } from "./router/drivers.router";
import { routerPath } from "./router/path.router";
import { testingRouter } from "./router/testing.router";

const jsonBodyMiddleware = express.json();
export const setupApp = (app: Express) => {
  app.use(jsonBodyMiddleware);

  app.use(routerPath.drivers, driversRouter);
  app.use(routerPath["testing/all-data"], testingRouter);

  app.get("/", (req, res) => {
    res.send("Back End");
  });
  return app;
};
