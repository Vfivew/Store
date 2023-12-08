import sortReducer, { setSortData, setSortType, setActiveButton } from '../sortSlice';

describe('Sort Reducer', () => {
    it('should set sort data', () => {
        const initialState = {
            allGoods: null,
            activeButton: null,
        };

        const newSortData = [
            { name: 'Product 1', price: '10.99', rating: [1, 2, 3] },
            { name: 'Product 2', price: '19.99', rating: [4, 5] },
        ];

        const action = setSortData(newSortData);
        const newState = sortReducer(initialState, action);

        expect(newState.allGoods).toBe(newSortData);
    });

    it('should set active button', () => {
        const initialState = {
            allGoods: null,
            activeButton: null,
        };

        const newActiveButton = 'PriceUp';

        const action = setActiveButton(newActiveButton);
        const newState = sortReducer(initialState, action);

        expect(newState.activeButton).toBe(newActiveButton);
    });

    it('should set sort type for PriceUp', () => {
    const initialState = {
        allGoods: [
            { name: 'Product 1', price: '10.99' },
            { name: 'Product 2', price: '19.99' },
        ],
        activeButton: null,
    };

    const action = setSortType('PriceUp');
    const newState = sortReducer(initialState, action);

    expect(newState.allGoods).toEqual([
        { name: 'Product 1', price: '10.99' },
        { name: 'Product 2', price: '19.99' },
        ]);
    });

    it('should set sort type for Pricedown', () => {
        const initialState = {
            allGoods: [
            { name: 'Product 1', price: '10.99' },
            { name: 'Product 2', price: '19.99' },
            ],
            activeButton: null,
        };

        const action = setSortType('Pricedown');
        const newState = sortReducer(initialState, action);


        expect(newState.allGoods).toEqual([
            { name: 'Product 2', price: '19.99' },
            { name: 'Product 1', price: '10.99' },
        ]);
    });

    it('should set sort type for Rating', () => {
        const initialState = {
            allGoods: [
            { name: 'Product 1', rating: [1, 2, 3] },
            { name: 'Product 2', rating: [4, 5] },
            { name: 'Product 3', rating: [] },
            { name: 'Product 4', } // if something happened and we don't get rating - it still work
            ],
            activeButton: null,
        };

        const action = setSortType('Rating');
        const newState = sortReducer(initialState, action);

        expect(newState.allGoods).toEqual([
            { name: 'Product 2', rating: [4, 5] },
            { name: 'Product 1', rating: [1, 2, 3] },
            { name: 'Product 3', rating: [] }, 
            { name: 'Product 4', }
        ]);
    });
});
