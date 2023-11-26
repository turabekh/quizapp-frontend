import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LogoutPage from './pages/LogoutPage';
import PublicHomePage from './pages/PublicHomePage';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import UnauthenticatedLayout from './layouts/UnauthenticatedLayout';
import { AuthContext } from './context/AuthContext';
import ProfilePage from './pages/ProfilePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import QuizPage from './pages/QuizPage';
import QuizResultsPage from './pages/QuizResultsPage';
import GradeBookPage from './pages/GradeBookPage';

const AppRoutes = () => {
    const { currentUser } = useContext(AuthContext);
    const ProtectedRoute = ({ children }) => {
        let user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            return <Navigate to="/" />;
        }
        return children;
    };

    return (
        <Routes>
            <Route path="/" element={currentUser ? <AuthenticatedLayout><CoursesPage /></AuthenticatedLayout> : <UnauthenticatedLayout><PublicHomePage /></UnauthenticatedLayout>} />
            <Route path="/login" element={<UnauthenticatedLayout><LoginPage /></UnauthenticatedLayout>} />
            <Route path="/register" element={<UnauthenticatedLayout><RegisterPage /></UnauthenticatedLayout>} />
            {/* Here you can add more unprotected routes as needed */}

            {/* Protected Routes */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <h1>Dashboard</h1>
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/logout"
                element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <LogoutPage />
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <ProfilePage />
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/courses"
                element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <CoursesPage />
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/courses/:courseId"
                element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <CourseDetailPage />
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/quizzes/results/:quizId"
                element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <QuizResultsPage />
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/quizes/:quizId"
                element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <QuizPage />
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/gradebook"
                element={
                    <ProtectedRoute>
                        <AuthenticatedLayout>
                            <GradeBookPage />
                        </AuthenticatedLayout>
                    </ProtectedRoute>
                }
            />



        </Routes>
    );
};

export default AppRoutes;
