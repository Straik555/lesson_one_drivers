import { PaginationAndSorting } from "../../core/types/pagination-and-sorting.type";
import { RideSortField } from "./ride-sort-field.type";

export type RideQueryInput = PaginationAndSorting<RideSortField>;
