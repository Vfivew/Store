import { createSlice } from "@reduxjs/toolkit";

import { ItemState } from "../../types/types";

const initialState: ItemState = {
  fullData: null,
  selectedItem: null,
  newFullData: null,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItemByArticle: (state, action) => {
      state.selectedItem = action.payload;
    },
    setFullData: (state, action) => {
      state.fullData = action.payload;
    },
    resetNewFullData: (state) => {
      state.newFullData = null;
    },
    setNewReview: (state, action) => {
      const { reviewData, rating } = action.payload;
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
                  if (!itemInside.rating) {
                    itemInside.rating = [];
                  }
                  itemInside.reviews.push(reviewData);
                  itemInside.rating.push(rating);
                }
              }
            }
          }
        }
      }
      state.newFullData = updatedFullData;
    },
  },
});

export const { setItemByArticle, setFullData, setNewReview, resetNewFullData } =
  itemSlice.actions;

export default itemSlice.reducer;
