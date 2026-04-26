import { DriverType } from "../../types/driver.type";

export type DriverViewModel = Omit<DriverType, "id" | "created">;
