// pages/LoginPage.js
import React from 'react';
import LoginForm from '../auth/components/LoginForm';
import "./page.css"

const LoginPage = () => {
    return (
        <div className='form-card form-width' >
            <LoginForm />
        </div>
    );
};

export default LoginPage;
