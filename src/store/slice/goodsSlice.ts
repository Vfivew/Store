import { createSlice } from "@reduxjs/toolkit";
import {GoodsState} from '../../models/goodsSliceModels'

const initialState: GoodsState = {
  data: null,
  type: null,
  filteredData: null,
  filterKey: null,
  id:''
};

const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setGoodsData: (state, action) => {
      state.data = action.payload;
      if (state.filterKey === null) {
        state.filteredData = state.data
      }
      state.filterKey = null
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

export const { setGoodsData, setFilteredGoods,setGoodsType,setId } = goodsSlice.actions;

export default goodsSlice.reducer;
