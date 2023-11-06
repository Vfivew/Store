import { createSlice } from '@reduxjs/toolkit';
import { DesireState } from '../../models/goodsSliceModels';

const initialState: DesireState = {
    desire: [],
};

const desireSlice = createSlice({
  name: 'desire',
  initialState,
  reducers: {
    setDesireItem: (state, action) => {
        state.desire = action.payload
    },
    addDesireItem: (state, action) => {
        const { item, itemId } = action.payload;
        let itemExists = false;
        for (let i = 0; i < state.desire.length; i++) {
            const existingItem = state.desire[i][0];
            const existingItemId = state.desire[i][1];
            if (existingItemId === itemId && existingItem.article === item.article) {
            itemExists = true;
            break;
            }
        }
        if (!itemExists) {
            state.desire = [...state.desire, [item, itemId]];
        }
    },
    removeDesireItem: (state, action) => {
        const itemIdToRemove = action.payload[0].article;
        state.desire = state.desire.filter((item) => item[0].article !== itemIdToRemove);
    },
  },
});

export const { setDesireItem, addDesireItem, removeDesireItem} = desireSlice.actions;
export default desireSlice.reducer;
