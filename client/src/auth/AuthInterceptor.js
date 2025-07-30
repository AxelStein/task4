import { useNavigate } from 'react-router-dom';
import apiClient from '../api/api.client.js';
import { useEffect } from 'react';

function AuthInterceptor() {
    const navigate = useNavigate();

    useEffect(() => {
        apiClient.interceptors.response.use((res) => res, err => {
            if (err.response && err.response.status === 401) {
                localStorage.removeItem('user');
                navigate('/sign-in', { replace: true });
            }
            return Promise.reject(err);
        });
    }, [navigate]);
    return null;
}

export default AuthInterceptor;