export interface GoodsState {
  data: { [key: string]: any } | null;
  type: null | string; 
  filteredData: { [key: string]: any } | null;
  filterKey: string | null;
  activeButton: string | null;
}

export interface SortState{
  allGoods: null | { [key: string]: any },
  activeButton: null | string,
}

export interface ItemState{
  fullData: { [key: string]: any } | null;
  selectedItem: { [key: string]: any } | null;
  newFullData: { [key: string]: any } | null;
}