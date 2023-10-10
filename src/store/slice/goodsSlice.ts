import { createSlice } from "@reduxjs/toolkit";
import {GoodsState} from '../../models/goodsSliceModels'

const initialState: GoodsState = {
  data: null,
  type: null,
  filteredData: null,
  filterKey: null,
  activeButton: null,
};

const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {
    setActiveButton:(state, action) => {
      state.activeButton = action.payload
    },
    setGoodsData: (state, action) => {
      state.data = action.payload;
      if (state.filterKey === null) {
        state.filteredData = state.data
        state.activeButton = null;
      }
      state.filterKey = null;
    },
    setGoodsType:(state, action) => {
      state.type = action.payload;
    },
    setFilteredGoods: (state, action) => {
      state.filterKey = action.payload;
      if (state.data) {
        if (state.filterKey === null) {
          state.filteredData = state.data;
        } else { 
          state.filteredData = {
            [state.filterKey]: state.data[state.filterKey] || null
          };
        }
      }
      // console.log(JSON.stringify(state.filteredData, null, 2));
    },
  },
});

export const { setGoodsData, setFilteredGoods,setGoodsType,setActiveButton } = goodsSlice.actions;

export default goodsSlice.reducer;
