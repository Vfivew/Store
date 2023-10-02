import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null, 
  filter: null,
};

const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {
    setGoodsFilter: (state, action) => {
      state.filter = action.payload;
    },
    setDataFromServer: (state, action) => {
      state.data = action.payload; 
    },
  },
});

export const { setGoodsFilter, setDataFromServer } = goodsSlice.actions;

export default goodsSlice.reducer;
