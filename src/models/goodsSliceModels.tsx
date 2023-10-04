export interface GoodsState {
  data: { [key: string]: any } | null;
  type: null | string; 
  filteredData: { [key: string]: any } | null;
  filterKey: string | null;
}

export interface SortState{
  allGoods: null| { [key: string]: any },
}