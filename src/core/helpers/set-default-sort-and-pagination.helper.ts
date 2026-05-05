import { PaginationAndSorting } from "../types/pagination-and-sorting.type";
import { paginationAndSortingDefault } from "../middlewares/validation/query-pagination-sorting-validation.middleware";

export const setDefaultSortAndPagination = <P = string>(
  query: Partial<PaginationAndSorting<P>>,
): PaginationAndSorting<P> => ({
  ...paginationAndSortingDefault,
  ...query,
  sortBy: (query.sortBy ?? paginationAndSortingDefault.sortBy) as P,
});
