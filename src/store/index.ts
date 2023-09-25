import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer, { setUser, removeUser } from './slice/userSlice';

const userToken = localStorage.getItem('userToken');
const userEmail = localStorage.getItem('userEmail');
const userId = localStorage.getItem('userId');

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  preloadedState: {
    user: {
      email: userEmail || null,
      token: userToken || null,
      id: userId || null,
    },
  },
});

if (userToken) {
  store.dispatch(setUser({ email: userEmail || '', id: userId || '', token: userToken }));
} else {
  store.dispatch(removeUser());
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;