// pages/LoginPage.js
import React from 'react';
import RegisterForm from '../auth/components/RegisterForm';
import "./page.css"

const LoginPage = () => {
    return (
        <div className='form-card form-width'>
            <RegisterForm />
        </div>
    );
};

export default LoginPage;
