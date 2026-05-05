import { PaginatedOutput } from "../../core/types/pagination-output.type";
import { RideDataOutput } from "./ride-data.output.type";

export type RideListPaginatedOutput = {
  meta: PaginatedOutput;
  data: RideDataOutput[];
};
