import { render, waitFor } from '@testing-library/react';
import LoginPage from '../LoginPage';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

const mockStoreWithToken = configureStore();
const mockStoreWithoutToken = configureStore();

test('redirects to / when authenticated', () => {
  const storeWithToken = mockStoreWithToken({
    user: {
      token: '214njmYT24BXJ6416kmybaevAR351',
    },
  });
  
  render(
    <Provider store={storeWithToken}>
      <MemoryRouter initialEntries={['/login']}>
        <LoginPage />
      </MemoryRouter>
    </Provider>
  );

  expect(window.location.pathname).toBe('/');
});

test('renders Login component when not authenticated', async () => {
  const storeWithoutToken = mockStoreWithoutToken({
    user: {
      email: null,
      token: null,
      id: null,
    },
  });

  render(
    <Provider store={storeWithoutToken}>
      <Router>
        <LoginPage />
      </Router>
    </Provider>
  );
  
  await waitFor(() => {
    expect(window.location.pathname).toBe('/login');
  });
});
