import React, { createContext, useState, useEffect, useCallback } from 'react';
import authService from '../auth/services/authService'; // Adjust the import path as necessary

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const register = async (email, firstName, lastName, password, studentGroupId) => {
        try {
            const data = await authService.register(email, firstName, lastName, password, studentGroupId);
            setCurrentUser(data?.user); 
        } catch (error) {
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const data = await authService.login(email, password);
            setCurrentUser(data?.user); // Assuming the login response has user data
        } catch (error) {
            throw error;
        }
    };

    const logout = useCallback(() => {
        setCurrentUser(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    }, []);

    const checkAuthStatus = useCallback(() => {
        const token = localStorage.getItem('authToken');
        const user = JSON.parse(localStorage.getItem('user'));
        if (currentUser == null && token && user) {
            setCurrentUser(user);
        }
        if (!token || !user) {
            logout();
            return;
        }
    }, [logout, currentUser]);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    const get_user_token = () => {
        const token = localStorage.getItem('authToken');
        return token;
    }
    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout, register, get_user_token }}>
            {children}
        </AuthContext.Provider>
    );
};
