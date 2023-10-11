import { createSlice } from '@reduxjs/toolkit';
import { BasketState } from '../../models/goodsSliceModels';

const initialState: BasketState = {
  basket: [],
  isBasketOpen: false,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
      setToogleModal: (state) => {
      state.isBasketOpen = !state.isBasketOpen;
      console.log(JSON.stringify(state.isBasketOpen, null, 2));
    },
      addBasketItem: (state, action) => {
      const { quantity , item , itemId } = action.payload; 
      console.log(quantity)
      console.log(item)
      state.basket = [...state.basket, [quantity , item, itemId]]; 
      console.log(JSON.stringify(state.basket, null, 2));
    },
  },
});


export const { setToogleModal,addBasketItem } = basketSlice.actions;
export default basketSlice.reducer;
