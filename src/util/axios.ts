import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
});

// request interceptor
axiosInstance.interceptors.request.use(
    config => {
        // add authorization header
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// response interceptor
axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // handle error response here
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
