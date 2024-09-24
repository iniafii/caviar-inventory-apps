import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Sesuaikan dengan URL backend Anda

const api = axios.create({
    baseURL: API_URL,
});

// Tambahkan interceptor untuk mengirim token JWT pada setiap request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Simpan token di localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;