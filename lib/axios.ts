import axios from 'axios';

// Create a base Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // your Laravel API base URL
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

export default api;
