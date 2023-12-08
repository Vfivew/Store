import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import RegisterPage from '../RegisterPage';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

const mockStoreWithoutToken = configureStore();

test('redirects to "/login" on button click', () => {
  const storeWithoutToken = mockStoreWithoutToken({
    user: {
      email: null,
      token: null,
      id: null,
    },
  });

  render(
    <Provider store={storeWithoutToken} >
      <MemoryRouter initialEntries={['/register']}>
        <RegisterPage/>
      </MemoryRouter>
    </Provider>
  );
  const signInLink = screen.getByText('Sign in');
  expect(signInLink).toBeInTheDocument();

  fireEvent.click(screen.getByText('Sign in'));

  expect(window.location.pathname).toBe('/login');
});
