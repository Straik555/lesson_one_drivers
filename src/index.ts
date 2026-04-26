import "dotenv/config";
import express from "express";
import { setupApp } from "./setup-app";
import { appConfig } from "./core/configs/app.configs";

export const app = express();

const PORT = appConfig.PORT;

setupApp(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
