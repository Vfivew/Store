import itemReducer, { setItemByArticle, setFullData, setNewReview, resetNewFullData } from '../../store/slice/itemSlice';

describe('Item Reducer', () => {
  it('should set item by article', () => {
    const initialState = {
      fullData: null,
      selectedItem: null,
      newFullData: null,
    };

    const newItem = { name: 'Test Item', article: '1' };
    const action = setItemByArticle(newItem);
    const newState = itemReducer(initialState, action);

    expect(newState.selectedItem).toBe(newItem);
  });

  it('should set full data', () => {
    const initialState = {
      fullData: null,
      selectedItem: null,
      newFullData: null,
    };

    const newFullData = { article: '1', name: 'Test Item' };
    const action = setFullData(newFullData);
    const newState = itemReducer(initialState, action);

    expect(newState.fullData).toBe(newFullData);
  });

    it('should set new review', () => {
        const initialState = {
            fullData: {
                category1: {
                item1: {
                    article: '1',
                    reviews: [],
                    rating: [],
                },
                },
            },
            selectedItem: { article: '1' },
            newFullData: null,
        };

        const reviewData = {
            text: 'Test Review',
            disadvantages: 'none',
            advantages: '',
            email: 'test@example.com',
            rating: [5],
            date: '07.12.2023'};
        const rating = 5;
        const action = setNewReview({ reviewData, rating });
        const newState = itemReducer(initialState, action);

        if (newState.newFullData) {  // or @ts-ignore
            expect(newState.newFullData.category1.item1.reviews[0].text).toEqual('Test Review');
            expect(newState.newFullData.category1.item1.reviews[0].advantages).toEqual('');
            expect(newState.newFullData.category1.item1.reviews[0].email).toEqual('test@example.com');
            expect(newState.newFullData.category1.item1.reviews[0].date).toEqual('07.12.2023');
            expect(newState.newFullData.category1.item1.reviews.length).toBe(1);
            expect(newState.newFullData.category1.item1.rating.length).toBe(1);
        }
    });

  it('should reset new full data', () => {
    const initialState = {
      fullData: null,
      selectedItem: null,
      newFullData: { article: '1', name: 'Test Item' },
    };

    const action = resetNewFullData();
    const newState = itemReducer(initialState, action);

    expect(newState.newFullData).toBe(null);
  });
});
