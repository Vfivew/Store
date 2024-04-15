import userReducer, { setUser, removeUser, selectUserEmail } from '../../store/slice/userSlice';

describe('User Reducer', () => {
  it('should set user', () => {
    const initialState = {
      email: null,
      token: null,
      id: null,
    };

    const newUser = {
      email: 'test@example.com',
      token: 'testToken',
      id: 'YoQUB08ZnabH3eXpzxqw7yhGdcX8',
    };

    const action = setUser(newUser);
    const newState = userReducer(initialState, action);

    expect(newState.email).toBe(newUser.email);
    expect(newState.token).toBe(newUser.token);
    expect(newState.id).toBe(newUser.id);

    expect(localStorage.getItem('userEmail')).toBe(newUser.email);
    expect(localStorage.getItem('userToken')).toBe(newUser.token);
    expect(localStorage.getItem('userId')).toBe(newUser.id);
  });

  it('should remove user', () => {
    const initialState = {
      email: 'test@example.com',
      token: 'testToken',
      id: 'YoQUB08ZnabH3eXpzxqw7yhGdcX8',
    };

    const action = removeUser();
    const newState = userReducer(initialState, action);

    expect(newState.email).toBeNull();
    expect(newState.token).toBeNull();
    expect(newState.id).toBeNull();

    expect(localStorage.getItem('userEmail')).toBeNull();
    expect(localStorage.getItem('userToken')).toBeNull();
    expect(localStorage.getItem('userId')).toBeNull();
  });
});

describe('User Selectors', () => {
  it('should select user email', () => {
    const state = {
      user: {
        email: 'test@example.com',
        token: 'testToken',
        id: 'YoQUB08ZnabH3eXpzxqw7yhGdcX8',
      },
    };

    const userEmail = selectUserEmail(state);

    expect(userEmail).toBe(state.user.email);
  });
});
