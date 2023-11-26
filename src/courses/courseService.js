import axios from 'axios';

const API_URL = 'https://turaboyformisc.pythonanywhere.com/api/courses/';  // Adjust the URL as needed

export const fetchCourses = async (token) => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const enrollInCourse = async (courseId, token) => {
    return axios.post(API_URL + `enroll/${courseId}/`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const fetchCoursesWithEnrollment = async (token) => {
    const response = await axios.get(API_URL + 'courses-with-enrollment/', {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
};


export const unenrollFromCourse = async (courseId, token) => {
    return axios.post(API_URL + `unenroll/${courseId}/`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const get_courses = async (courseId, token) => {
    const response = await axios.get(API_URL + `courses/${courseId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}