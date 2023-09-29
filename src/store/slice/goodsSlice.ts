import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  filteredData: null, 
  filterKey: null as string | null,
};

const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {
    setGoodsData: (state, action) => {
      state.data = action.payload;
      console.log(state.data)
    },
    setFilteredGoods: (state, action) => {
      console.log(state.data)
      state.filterKey = action.payload;
      if (state.data) {
        if (state.filterKey === null) {
          console.log(state.filterKey)
          state.filteredData = null;
        } else {
          state.filteredData = state.data[state.filterKey] || null;
          console.log(state.filteredData)
        }
      }
    },
  },
});

export const { setGoodsData, setFilteredGoods } = goodsSlice.actions;

export default goodsSlice.reducer;
