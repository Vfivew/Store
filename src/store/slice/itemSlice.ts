import { createSlice } from "@reduxjs/toolkit";
import {ItemState} from '../../models/goodsSliceModels'

const initialState: ItemState = {
  fullData: null,
  selectedItem: null,
  newFullData:null,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItemByArticle:(state, action) => {
      state.selectedItem = action.payload
    },
    setFullData: (state, action) => {
      state.fullData = action.payload
    },
    setNewReview: (state, action) => {
      const updatedFullData = { ...state.fullData };

      if (state.selectedItem && state.fullData) {
        for (const key in updatedFullData) {
        if (Object.hasOwnProperty.call(updatedFullData, key)) {
          const item = updatedFullData[key];
          for (const innerKey in item) {
            if (Object.hasOwnProperty.call(item, innerKey)) {
              const itemInside = item[innerKey];
              if (itemInside.article === state.selectedItem.article) {
                if (!itemInside.reviews) {
                  itemInside.reviews = [];
                }
                itemInside.reviews.push(action.payload);
              }
            }
          }
        }
      }
      }
      state.newFullData = updatedFullData
      console.log(JSON.stringify(state.newFullData, null, 2));
      }
    }
});

export const { setItemByArticle , setFullData,setNewReview} = itemSlice.actions;

export default itemSlice.reducer;
