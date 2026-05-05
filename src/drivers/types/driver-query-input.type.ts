import { PaginationAndSorting } from "../../core/types/pagination-and-sorting.type";
import { DriverSortField } from "./driver-sort-field.type";

export type DriverQueryInput = PaginationAndSorting<DriverSortField> &
  Partial<{
    searchDriverNameTerm: string;
    searchDriverEmailTerm: string;
    searchVehicleMakeTerm: string;
  }>;
