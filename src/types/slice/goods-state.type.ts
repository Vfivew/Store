export type GoodsState = {
  data: { [key: string]: any } | null;
  type: null | string;
  filteredData: { [key: string]: any } | null;
  filterKey: string | null;
  activeButton: string | null;
  activeAdditionalFilter: any[];
  prevItemId: string;
  noAdditionalFilterData: { [key: string]: any } | null;
  minPrice: null | string;
  maxPrice: null | string;
};
