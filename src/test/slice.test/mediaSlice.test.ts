import mediaReducer, {
  setSortMenuActive,
  setFilterMenuActive,
  setNavBurgerActive,
  setHeaderBurgerActive,
} from '../../store/slice/mediaSlice';

describe('Media Reducer', () => {
  it('should set sort menu active', () => {
    const initialState = {
      sortMenuActive: false,
      filterMenuActive: false,
      navBurgerActive: false,
      headerBurgerActive: false,
    };
    const action = setSortMenuActive(true);
    const newState = mediaReducer(initialState, action);

    expect(newState.sortMenuActive).toBe(true);
    expect(newState.filterMenuActive).toBe(false);
    expect(newState.navBurgerActive).toBe(false);
    expect(newState.headerBurgerActive).toBe(false);
  });

  it('should set filter menu active', () => {
    const initialState = {
      sortMenuActive: false,
      filterMenuActive: false,
      navBurgerActive: false,
      headerBurgerActive: false,
    };
    const action = setFilterMenuActive(true);
    const newState = mediaReducer(initialState, action);

    expect(newState.sortMenuActive).toBe(false);
    expect(newState.filterMenuActive).toBe(true);
    expect(newState.navBurgerActive).toBe(false);
    expect(newState.headerBurgerActive).toBe(false);
  });

  it('should set nav burger active', () => {
    const initialState = {
      sortMenuActive: false,
      filterMenuActive: false,
      navBurgerActive: false,
      headerBurgerActive: false,
    };
    const action = setNavBurgerActive(true);
    const newState = mediaReducer(initialState, action);

    expect(newState.sortMenuActive).toBe(false);
    expect(newState.filterMenuActive).toBe(false);
    expect(newState.navBurgerActive).toBe(true);
    expect(newState.headerBurgerActive).toBe(false);
  });

  it('should set header burger active', () => {
    const initialState = {
      sortMenuActive: false,
      filterMenuActive: false,
      navBurgerActive: false,
      headerBurgerActive: false,
    };
    const action = setHeaderBurgerActive(true);
    const newState = mediaReducer(initialState, action);

    expect(newState.sortMenuActive).toBe(false);
    expect(newState.filterMenuActive).toBe(false);
    expect(newState.navBurgerActive).toBe(false);
    expect(newState.headerBurgerActive).toBe(true);
  });
});
