import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://0.0.0.0:3003/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
  });

export default apiClient;