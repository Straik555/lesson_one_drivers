import { PaginatedOutput } from "../../../core/types/pagination-output.type";
import { DriverDataOutput } from "./driver-data.output.type";

export type DriverListPaginatedOutput = {
  meta: PaginatedOutput;
  data: DriverDataOutput[];
};
