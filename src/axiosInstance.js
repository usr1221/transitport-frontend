import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // Backend URL
    withCredentials: true, // Include credentials like cookies if needed
    headers: {
        'Content-Type': 'application/json',
    },
});
// Add a request interceptor to include the token dynamically
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken'); // Retrieve the token from local storage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Set the Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;