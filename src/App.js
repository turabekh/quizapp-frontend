import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';

const queryClient = new QueryClient();

const App = () => {
    return (
        <Router>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
            </QueryClientProvider>
        </Router>
    );
};

export default App;
