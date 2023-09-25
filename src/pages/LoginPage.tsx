import React from 'react';
import { Link } from 'react-router-dom';
import { Login } from '../components/Auth/Login';

const LoginPage: React.FC = () => {
  return (
    <div>
      <div>
        <Login />
        <Link
          to="/register"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
