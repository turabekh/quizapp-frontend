import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LogoutPage = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        logout(); // Clear user authentication data
        navigate('/login'); // Redirect to login page
    }, [logout, navigate]);

    return (
        <div>
            <p>Logging out...</p>
            {/* You can add more content or a spinner here */}
        </div>
    );
};

export default LogoutPage;
