import { createSlice } from "@reduxjs/toolkit";
import {GoodsState} from '../../models/goodsSliceModels'

const initialState: GoodsState = {
  data: null,
  type: null,
  filteredData: null,
  filterKey: null,
  activeButton: null,
  activeAdditionalFilter: [],
  prevItemId: '',
  noAdditionalFilterData: null,
  minPrice: null,
  maxPrice: null
};

const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {
    setPrevItemId:(state, action) => {
      state.prevItemId = action.payload
    },
    setActiveButton:(state, action) => {
      state.activeButton = action.payload
    },
    setGoodsData: (state, action) => {
      state.activeAdditionalFilter = [];
      state.filterKey = null;
      state.data = action.payload;
      if (state.filterKey === null && state.activeAdditionalFilter.length === 0) {
        state.filteredData = state.data
        state.activeButton = null;
      }
      // console.log(JSON.stringify(state.data, null, 2))
    },
    setGoodsType:(state, action) => {
      state.type = action.payload;
    },

    setPrice: (state, action) => {
      const { min, max } = action.payload;
      if (min === null || max === null) {
        state.filteredData = state.filteredData
      }

      if (min !== null || max !== null) {
        state.minPrice = min;
        state.maxPrice = max;
      } 
      console.log(JSON.stringify(state.minPrice, null, 2))
      console.log(JSON.stringify(state.maxPrice, null, 2))
     // console.log(JSON.stringify(state.filteredData, null, 2))
      
      const priceFilterData: { [key: string]: any } = {};
      
      let cheakArray: any;
      if (state.filterKey ===null && state.activeAdditionalFilter.length===0) {
        cheakArray = state.data
      } else if (state.filterKey !==null && state.activeAdditionalFilter.length===0) {
        cheakArray = state.noAdditionalFilterData
      } else if (state.filterKey !==null && state.activeAdditionalFilter.length > 0) {
        cheakArray = state.filteredData
      }
  
      if (cheakArray) {
          Object.keys(cheakArray).forEach((category) => {
            if (cheakArray) {
              const categoryGoods = cheakArray[category];
              Object.keys(categoryGoods).forEach((article) => {
              const articleData = categoryGoods[article];
              console.log(JSON.stringify(articleData.price, null, 2))
              const price = articleData.price;
              if (state.minPrice && state.maxPrice) {
                if (!isNaN(price) && price >= parseInt(state.minPrice) && price <= parseInt(state.maxPrice)) {
                  if(!priceFilterData[category]){
                    priceFilterData[category] = {}
                  }
                  priceFilterData[category][article] = articleData;
                }
              }
              console.log(JSON.stringify(priceFilterData, null, 2))
              });
            }

          });
      }

      if (state.minPrice !== null || state.maxPrice !== null) {
        state.filteredData = priceFilterData
      }

    },
    setAdditionalFilter: (state, action) => {
      console.log('+')
      let categoryToUse: string | null = null;
      // перевірям, виклив відбувася з активованими фільтрами, чи без
      if (action.payload === null) {
        console.log('null')
        state.activeAdditionalFilter = state.activeAdditionalFilter
      } else {
        console.log('action.payload')
        state.activeAdditionalFilter = action.payload
      }  
      // якщо немає ні фільтра, ні ключа, стан відфільтрованого фільтру = початковому стану
      if (state.activeAdditionalFilter.length === 0 && state.filterKey === null) {
        console.log('you dotn except it?')
        state.filteredData = state.data
      }

      let additionalFilterData: any = {};
      // пошук без фільтр ключа
      if (state.filteredData && state.activeAdditionalFilter.length >= 0) {
        state.activeAdditionalFilter.forEach((filter) => {
          const { key, value } = filter;
          if (state.filteredData && state.filterKey === null ) {
            Object.keys(state.filteredData).forEach((category) => {
              categoryToUse = category;
              if (state.filteredData) {
                const categoryGoods = state.filteredData[category];
                if (categoryGoods) {
                  Object.keys(categoryGoods).forEach((article) => {
                    const articleData = categoryGoods[article];
                    if (articleData[key] && articleData[key] === value) {
                      additionalFilterData[article] = articleData;
                    }
                  });
                }
              }
               console.log('im work if')
          });
          }
          // пошук з ключем фільтрації
           else if ((state.filteredData && state.filterKey !== null && state.activeAdditionalFilter.length >= 0)) {
            categoryToUse = state.filterKey
            console.log('im work')
            const categoryGoods = state.filteredData[state.filterKey];
              Object.keys(categoryGoods).forEach((article) => {
                const articleData = categoryGoods[article];
                if (articleData[key] && articleData[key] === value) {
                  additionalFilterData[article] = articleData;
                }
              });
          }
        });
      }

      if (categoryToUse) {
        console.log("categoryToUse if")
        // якщо є активні додаткові фільтри
        if (state.activeAdditionalFilter.length >= 1) {
          console.log("categoryToUse if if")
            state.filteredData = { [categoryToUse]: additionalFilterData };
        }
        // якщо немає активних додаткових фільтрів і ключа немає
        else {
          console.log("categoryToUse if else")
          if (state.filteredData) {
              console.log("categoryToUse if else if")
                state.filteredData = {
                    [categoryToUse]: {
                        ...state.filteredData[categoryToUse],
                        ...additionalFilterData,
                    },
                };
            }
        }
      } else {
        console.log("categoryToUse else")
        // якщо додаткових фільтрів немає, а ключ є, використовуємо масив відфільтрований по фільтр ключу
        if (state.activeAdditionalFilter.length === 0 && state.filterKey !==null) {
          state.filteredData=state.noAdditionalFilterData
        }
      }
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
          state.noAdditionalFilterData = state.filteredData
        }
      }
     //console.log(JSON.stringify(state.filterKey , null, 2))
    },
  },
});

export const { setPrice, setPrevItemId,setGoodsData, setFilteredGoods,setGoodsType,setActiveButton,setAdditionalFilter } = goodsSlice.actions;

export default goodsSlice.reducer;
///
