import basketReducer, { addBasketItem,setBasketItem,resetStoreBasket,removeBasketItem } from '../basketSlise';

// a given object may have a different interface,
// but the main thing is that the field article is always defined 
interface NewItem {
    article: string;
}

describe('Basket Slice Reducers', () => {
    let newItem: NewItem;
    const sampleItemId = "Coils";
    const sampleQuantity = 1;
    const newQuantity = 2
    
    beforeEach(() => {
        newItem = {
            "article": "11",
        };
    });

    it('should set basket items', () => {
        const initialState = { basket: [], isBasketOpen: false };
        const newBasket = [[sampleQuantity, newItem, sampleItemId], [sampleQuantity, newItem, sampleItemId]];

        const action = setBasketItem(newBasket);
        const state = basketReducer(initialState, action);

        expect(state.basket).toEqual(newBasket);
    });

    it('should reset basket items', () => {
        const initialState = {
            basket: [[sampleQuantity, newItem, sampleItemId], [sampleQuantity, newItem, sampleItemId]],
            isBasketOpen: false
        };

        const action = resetStoreBasket();
        const state = basketReducer(initialState, action);

        expect(state.basket).toEqual([]);
    });
    
    it('should add a new item to the empty basket', () => {
        const initialState = { basket: [], isBasketOpen: false };

        const action = addBasketItem({ quantity: sampleQuantity, item: newItem, itemId: sampleItemId });
        const state = basketReducer(initialState, action);

        expect(state.basket).toEqual([[sampleQuantity, newItem, sampleItemId]]);
    });

    it('should update the quantity of an existing item in the basket', () => {
        const initialState = {
            basket: [
            [sampleQuantity, 
            newItem, 
            sampleItemId]
            ],
            isBasketOpen: false
    };
    // newItem contains the article:11, so we are waiting for the quantity to be updated
    const action = addBasketItem({ quantity: newQuantity, item: newItem, itemId: sampleItemId });
    const state = basketReducer(initialState, action);

    expect(state.basket).toEqual([[sampleQuantity+newQuantity, newItem, sampleItemId]]);
  });
    
    
    it('should remove an item from the basket', () => {
        const initialState = {
            basket: [
            [sampleQuantity, newItem, sampleItemId],
            [sampleQuantity, { "article": "12" }, sampleItemId]
            ],
            isBasketOpen: false
    };

    const action = removeBasketItem(newItem.article);
    const state = basketReducer(initialState, action);

    expect(state.basket).toEqual([[sampleQuantity, { "article": "12" }, sampleItemId]]);
  });
});
