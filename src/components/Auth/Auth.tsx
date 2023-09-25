import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { removeUser } from '../../store/slice/userSlice';
import { Link } from 'react-router-dom';

const Auth: React.FC = () => {
    const dispatch = useDispatch();
    const { isAuth, email } = useAuth();

    const handleLogout = () => {
        dispatch(removeUser());
    };

    return isAuth ? (
        <section>
            <button onClick={handleLogout}>Log out from {email}</button>
        </section>
    ) : (
        <button>
            Login
        </button>
    );
};

export default Auth;
