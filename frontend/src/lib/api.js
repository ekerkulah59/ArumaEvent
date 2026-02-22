import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
const API_BASE = `${BACKEND_URL}/api`;

const api = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Contact & Quote API (all content comes from staticData.js)
export const contactApi = {
    submitContact: (data) => api.post('/contact', data),
    submitQuote: (data) => api.post('/quotes', data),
};

export default api;
