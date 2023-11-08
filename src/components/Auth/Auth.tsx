import React from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { removeUser } from '../../store/slice/userSlice';

const Auth: React.FC = () => {
    const dispatch = useDispatch();
    const { isAuth } = useAuth();

    const handleLogout = () => {
        dispatch(removeUser());
    };

    return isAuth ? (
        <section>
            <button className='button-auth' onClick={handleLogout}>Log out</button>
        </section>
    ) : (
        <button className='button-auth'>
            Login
        </button>
    );
};

export default Auth;
