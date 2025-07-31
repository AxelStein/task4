import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export default apiClient;