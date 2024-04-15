import desireReducer, { setDesireItem, addDesireItem, removeDesireItem } from '../../store/slice/desireSlice';

interface NewItem {
  article: string;
}

describe('Desire Slice Reducers', () => {
    let newItem1: NewItem;
    let newItem2: NewItem;
    let category1: string;
    let category2: string;

    beforeEach(() => {
        newItem1 = {
            "article": "11",
        };
        newItem2 = {
            "article": "12",
        };
        category1 = 'Category1';
        category2 = 'Category2'
    });

    it('should set desire items', () => {
        const initialState = { desire: [] };
        const newDesire = [
            [newItem1, category1],
            [newItem2, category2]
        ];

        const action = setDesireItem(newDesire);
        const state = desireReducer(initialState, action);

        expect(state.desire).toEqual(newDesire);
    });

    it('should add a new desire item to the list', () => {
        const initialState = { desire: [] };

        const action = addDesireItem({ item: newItem1, itemId: category1 });
        const state = desireReducer(initialState, action);

        expect(state.desire).toEqual([[newItem1, category1]]);
    });

    it('should not add duplicate desire item to the list', () => {
        const initialState = {
            desire: [
                [newItem1, category1]
            ]
        };

        const action = addDesireItem({ item: newItem1, itemId:category1 });
        const state = desireReducer(initialState, action);

        // No change in the state as the item is already in the list
        expect(state.desire).toEqual([[newItem1, category1]]);
        expect(state.desire.length).toEqual(1);
    });

    it('should remove a desire item from the list', () => {
        const initialState = {
        desire: [
                [newItem1, category1],
                [newItem2, category2]
            ]
        };

        const action = removeDesireItem([newItem1]);
        const state = desireReducer(initialState, action);

        expect(state.desire).toEqual([[newItem2, category2]]);
    });
});
