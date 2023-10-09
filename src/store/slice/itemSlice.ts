import { createSlice } from "@reduxjs/toolkit";
import {ItemState} from '../../models/goodsSliceModels'

const initialState: ItemState = {
  selectedItem: null,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItemByArticle:(state, action) => {
      state.selectedItem = action.payload
      },
    }
});

export const { setItemByArticle } = itemSlice.actions;

export default itemSlice.reducer;
