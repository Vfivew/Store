import { createSlice } from "@reduxjs/toolkit";
import { SortState } from "../../types/types";

const initialState: SortState = {
  allGoods: null,
  activeButton: null,
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSortData: (state, action) => {
      state.allGoods = action.payload;
    },
    setActiveButton: (state, action) => {
      state.activeButton = action.payload;
    },
    setSortType: (state, action) => {
      const sortType = action.payload;
      if (state.allGoods && sortType === "PriceUp") {
        if (Array.isArray(state.allGoods)) {
          state.allGoods.sort((a, b) => {
            const priceA = parseFloat(a.price || a.article?.price || "0");
            const priceB = parseFloat(b.price || b.article?.price || "0");
            return priceA - priceB;
          });
        }
      } else if (state.allGoods && sortType === "Pricedown") {
        if (Array.isArray(state.allGoods)) {
          state.allGoods.sort((a, b) => {
            const priceA = parseFloat(a.price || a.article?.price || "0");
            const priceB = parseFloat(b.price || b.article?.price || "0");
            return priceB - priceA;
          });
        }
      } else if (state.allGoods && sortType === "Rating") {
        console.log(JSON.stringify(state.allGoods, null, 2));
        if (Array.isArray(state.allGoods)) {
          state.allGoods.sort((a, b) => {
            const ratingA = a.rating
              ? a.rating.reduce(
                  (acc: number, curr: string) => acc + parseInt(curr),
                  0
                ) / (a.rating.length || 1)
              : 0;
            const ratingB = b.rating
              ? b.rating.reduce(
                  (acc: number, curr: string) => acc + parseInt(curr),
                  0
                ) / (b.rating.length || 1)
              : 0;

            return ratingB - ratingA;
          });
        }
      }
    },
  },
});

export const { setSortData, setSortType, setActiveButton } = sortSlice.actions;

export default sortSlice.reducer;
