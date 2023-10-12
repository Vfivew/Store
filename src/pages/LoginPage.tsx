import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Login } from '../components/Auth/Login';
import { useAppSelector } from '../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const isAuth = useAppSelector((state) => state.user.token);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (isAuth) {
      navigate('/'); 
    }
  }, [isAuth, navigate]);

  return (
    <div>
      <div>
        <Login />
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default LoginPage;
