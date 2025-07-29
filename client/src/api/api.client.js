import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3003/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
  });

export default apiClient;