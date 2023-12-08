import React from 'react';

import { Link } from 'react-router-dom';
import { SignUp } from '../components/Auth/SignUp';

const RegisterPage:React.FC = () => {
    return (
    <main className='auth-page'>
      <div className='auth-page-block'>
            <SignUp />
                <div className='auth-page-reference'>
                <p > Already have an account?</p>
                <Link className='gradient-button'
                    to="/login">Sign in 
                </Link> 
                </div>  
        </div>
    </main>
    )
}

export default RegisterPage