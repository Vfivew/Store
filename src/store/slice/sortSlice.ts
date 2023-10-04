import { createSlice } from "@reduxjs/toolkit";
import {SortState} from '../../models/goodsSliceModels'

const initialState: SortState = {
  allGoods: null,
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSortData: (state, action) => {
        state.allGoods = action.payload;
        console.log("setSortData:", state.allGoods);
    },
    setSortType: (state, action) => {
    //   const sortType = action.payload;
    //   if (state.allGoods && sortType === 'PriceUp') {
    //     const sortedKeys = Object.keys(state.allGoods).sort((a, b) => {
    //       const priceA = parseFloat(state.allGoods[a].price);
    //       const priceB = parseFloat(state.allGoods[b].price);
    //       return priceA - priceB;
    //     });
    //     console.log(sortedKeys)
    //     const sortedObject: { [key: string]: any } = {};
    //     sortedKeys.forEach((key) => {
    //         sortedObject[key] = state.allGoods[key];
    //         console.log('so', JSON.stringify(sortedObject[key]))
    //         console.log('SA', JSON.stringify(state.allGoods[key]))
    //         console.log('FINAL', JSON.stringify(sortedKeys))
    //         console.log('STEP', JSON.stringify(sortedObject))
    //     });
    //     //state.allGoods = sortedObject;
    //     state.allGoods = { ...sortedObject };
    //     console.log('PriceUp', JSON.stringify(state.allGoods));
    //     }
    //     else if (state.allGoods && sortType === 'Pricedown') {
    //         console.log('Pricedown', JSON.stringify(state.allGoods));
    //     }
    //     else if (state.allGoods && sortType === 'Rating') {
    //         console.log('Rating', JSON.stringify(state.allGoods));
    //     }
  },  
  },    
});

export const { setSortData,setSortType } = sortSlice.actions;

export default sortSlice.reducer;
