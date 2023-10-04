import { createSlice } from "@reduxjs/toolkit";
import {GoodsState} from '../../models/goodsSliceModels'

const initialState: GoodsState = {
  data: null,
  type: null,
  filteredData: null,
  filterKey: null,
};

const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {
    setGoodsData: (state, action) => {
      state.data = action.payload;
      state.filteredData = state.data;
      console.log("setGoodsData:",state.filteredData);
    },
    setGoodsType:(state, action) => {
      state.type = action.payload;
      console.log("setGoodsType:",state.type);
    },
    setFilteredGoods: (state, action) => {
      state.filterKey = action.payload;
      if (state.data) {
        if (state.filterKey === null) {
          state.filteredData = null;
        } else { 
          state.filteredData = {
            [state.filterKey]: state.data[state.filterKey] || null
          };
        }
      }
    },
  },
});

export const { setGoodsData, setFilteredGoods,setGoodsType } = goodsSlice.actions;

export default goodsSlice.reducer;
