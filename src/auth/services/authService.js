import axios from 'axios';

const API_URL = 'https://turaboyformisc.pythonanywhere.com/api/auth/'; // Adjust your API base URL here

const register = async (email, firstName, lastName, password, studentGroupId) => {
    const response = await axios.post(API_URL + 'register/', {
        email,
        first_name: firstName,  // Ensure these fields match your Django User model
        last_name: lastName,
        password, 
        student_group: studentGroupId 
    });
    if (response.data.access) {
        localStorage.setItem('authToken', response.data.access);
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Assuming response.data.user contains user data
    }
    return response.data;
};

const login = async (email, password) => {
    const response = await axios.post(API_URL + 'login/', {
        email,
        password
    });
    if (response.data.access) {
        localStorage.setItem('authToken', response.data.access);
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Assuming response.data.user contains user data
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const getUserFromToken = async (token) => {
    try {
        const response = await axios.post(API_URL + 'get-user/', { token });
        return response.data; // Assuming the backend returns user data based on the token
    } catch (error) {
        throw error;
    }
};

const authService = {
    register,
    login,
    logout,
    getCurrentUser,
    getUserFromToken
};

export default authService;
