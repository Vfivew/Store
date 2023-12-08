import goodsReducer, {
  setPrevItemId,
  resetFilter,
  setActiveButton,
  setGoodsData,
  setGoodsType,
  setFilter,
  setFilteredGoods,
} from '../goodsSlice';
import { GoodsState } from '../../../models/goodsSliceModels';
import { applyFilter } from '../../../components/Goods/Filter/filterUtils/applyFilter';
import { applyFilterWithFilterKey } from '../../../components/Goods/Filter/filterUtils/applyFilterWithFilterKey';

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

describe('Goods Slice Reducers', () => {
    it('should set prevItemId', () => {
        const newPrevItemId = '1';
        const action = setPrevItemId(newPrevItemId);
        const state = goodsReducer(initialState, action);

        expect(state.prevItemId).toEqual(newPrevItemId);
    });

    it('should reset filter', () => {
        const action = resetFilter();
        const state = goodsReducer(initialState, action);

        expect(state.minPrice).toBeNull();
        expect(state.maxPrice).toBeNull();
        expect(state.activeAdditionalFilter).toEqual([]);
        expect(state.filteredData).toBeNull();
    });

    it('should set active button', () => {
        const newActiveButton = 'button1';
        const action = setActiveButton(newActiveButton);
        const state = goodsReducer(initialState, action);

        expect(state.activeButton).toEqual(newActiveButton);
    });

    it('should set goods data', () => {
        const newData = { item1: { name: 'Item 1' }, item2: { name: 'Item 2' } };
        const action = setGoodsData(newData);
        const state = goodsReducer(initialState, action);

        expect(state.data).toEqual(newData);
        expect(state.activeAdditionalFilter).toEqual([]);
        expect(state.filteredData).toEqual(newData);
        expect(state.activeButton).toBeNull();
    });

    it('should set goods type', () => {
        const newType = 'Coils';
        const action = setGoodsType(newType);
        const state = goodsReducer(initialState, action);

        expect(state.type).toEqual(newType);
    });

    it('should set filter if filterKey === null', () => {
        const newFilter = { min: 10, max: 50, updatedFilter: [{ key: 'someKey', value: 'someValue' }] };
        const action = setFilter(newFilter);
        const state = goodsReducer(initialState, action);
        const chekedData = state.data; // because filterKey === null

        expect(state.minPrice).toEqual(newFilter.min);
        expect(state.maxPrice).toEqual(newFilter.max);
        expect(state.activeAdditionalFilter).toEqual(newFilter.updatedFilter);

        const expectedFilteredData = applyFilter({
            min: newFilter.min,
            max: newFilter.max,
            updatedFilter: newFilter.updatedFilter,
            chekedData,
        });
        expect(state.filteredData).toEqual(expectedFilteredData);
    });

        it('should set filter if filterKey !== null', () => {
        const newFilter = { min: 10, max: 50, updatedFilter: ['this Company'] };
        const action = setFilter(newFilter);
        const state = goodsReducer(initialState, action);
        const chekedData = state.noAdditionalFilterData // because filterKey !== null

        expect(state.minPrice).toEqual(newFilter.min);
        expect(state.maxPrice).toEqual(newFilter.max);
        expect(state.activeAdditionalFilter).toEqual(newFilter.updatedFilter);

        const expectedFilteredData = applyFilterWithFilterKey({
            min: newFilter.min,
            max: newFilter.max,
            updatedFilter: newFilter.updatedFilter,
            chekedData,
            category: state.filterKey
        });

        expect(state.filteredData).toEqual(expectedFilteredData);
    });

    it('should set filtered goods', () => {
        const newFilterKey = null;
        const action = setFilteredGoods(newFilterKey);
        const state = goodsReducer(initialState, action);

        expect(state.filterKey).toEqual(newFilterKey);
        expect(state.filteredData).toEqual(state.data);
    });

    it('should set filtered goods with filterKey !== null', () => {
        const newFilterKey = 'Carps';
        const data = {
            "Carps": {
                "02": {
                    "rating": [],
                    "number of sections": "7",
                    "length": "3.6",
                    "img": "https://i.imgur.com/WmGnCpj.jpg",
                    "material": "Carbon",
                    "price": "26",
                    "weigth": "320",
                    "article": "02",
                    "producer": "Kalipso",
                    "transport length": "1.1",
                    "name": " Kalipso Carpo Tele 3.60m 3.5lb",
                    "reviews": []
                },
            }
        };

        const action = setGoodsData(data);
        const stateWithGoodsData = goodsReducer(initialState, action);

        const filterAction = setFilteredGoods(newFilterKey);
        const finalState = goodsReducer(stateWithGoodsData, filterAction);

        expect(finalState.filterKey).toEqual(newFilterKey);
        expect(finalState.filteredData).toEqual({
            [newFilterKey]: data[newFilterKey] || null
        });
        expect(finalState.noAdditionalFilterData).toEqual(finalState.filteredData);
    });
});

