import Axios from 'axios';
import { apiUrl } from './environment-variables';

Axios.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.baseURL = apiUrl;
        return config;
    },
    function (error) {
        console.log('error', error.message);
        return Promise.reject(error);
    }
);

export const setupInterceptors = (showNotification) => {
    Axios.interceptors.response.use(
        function (response) {
            if ((response?.status === 200 && response?.data?.message)) {
                showNotification(response.data.message, 'success');
            };
            return response;
        },
        function (error) {
            if (error.response.data) {
                showNotification(error.response.data.message, 'error');
            };
            return Promise.reject(error);
        }
    );
}

const https = {
    get: Axios.get,
    post: Axios.post,
    put: Axios.put,
    delete: Axios.delete,
    patch: Axios.patch
};

export default https;
