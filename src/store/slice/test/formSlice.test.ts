import formReducer, { setDeliveryMethod, setIsOrderPlaced } from '../formSlice';

describe('Form Slice Reducers', () => {
  it('should set delivery method', () => {
    const initialState = {
      deliveryMethod: '',
      isOrderPlaced: false,
    };

    const newDeliveryMethod = 'express';
    const action = setDeliveryMethod(newDeliveryMethod);
    const state = formReducer(initialState, action);

    expect(state.deliveryMethod).toEqual(newDeliveryMethod);
    expect(state.isOrderPlaced).toEqual(initialState.isOrderPlaced);
  });

  it('should set isOrderPlaced', () => {
    const initialState = {
      deliveryMethod: 'standard',
      isOrderPlaced: false,
    };

    const newIsOrderPlaced = true;
    const action = setIsOrderPlaced(newIsOrderPlaced);
    const state = formReducer(initialState, action);

    expect(state.isOrderPlaced).toEqual(newIsOrderPlaced);
    expect(state.deliveryMethod).toEqual(initialState.deliveryMethod);
  });
});
