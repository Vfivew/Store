import React from 'react';
import { Link } from 'react-router-dom';

import { SignUp } from '../components/Auth/SignUp';

const RegisterPage:React.FC = () => {
    return (
    <div>
      <div>
            <SignUp />
            <p > Already have an account?</p>
                <Link
                    to="/login">Sign in
                </Link>   
        </div>
    </div>
    )
}

export default RegisterPage