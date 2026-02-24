import axios from 'axios';

/**
 * API Service
 * Centralized API configuration and utilities
 */

// API Configuration - use same backend URL as lib/api for consistency
// Timeout 90s — Render free-tier cold starts can take 60-90s
const API_CONFIG = {
    baseURL: process.env.REACT_APP_BACKEND_URL
        ? `${process.env.REACT_APP_BACKEND_URL}/api`
        : process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
    timeout: 90000,
    headers: {
        'Content-Type': 'application/json',
    },
};

// Create axios instance
const apiClient = axios.create(API_CONFIG);

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        // Handle errors globally
        const isTimeout = error.code === 'ECONNABORTED' || error.message?.includes('timeout');
        const isNetworkError = !error.response && (error.message === 'Network Error' || error.code === 'ERR_NETWORK');
        const baseURL = apiClient.defaults.baseURL || 'backend';
        let errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        if (isTimeout) {
            errorMessage = 'The request took too long. The server may be starting up — please try again in a few seconds.';
        } else if (isNetworkError) {
            errorMessage = `Can't reach the server. Make sure the backend is running at ${baseURL}.`;
        }

        if (isNetworkError) {
            console.error('Network Error: Backend may be down or wrong URL. baseURL:', baseURL);
        } else {
            console.error('API Error:', errorMessage);
        }

        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
        }

        return Promise.reject({
            message: errorMessage,
            status: error.response?.status,
            data: error.response?.data,
        });
    }
);

/**
 * API Service Methods
 */
const apiService = {
    // GET request
    get: async (url, config = {}) => {
        try {
            return await apiClient.get(url, config);
        } catch (error) {
            throw error;
        }
    },

    // POST request
    post: async (url, data, config = {}) => {
        try {
            return await apiClient.post(url, data, config);
        } catch (error) {
            throw error;
        }
    },

    // POST with retry on timeout (for Render cold starts). Retries once after 5s.
    postWithRetry: async (url, data, config = {}) => {
        try {
            return await apiClient.post(url, data, config);
        } catch (err) {
            const isTimeout = err?.message?.includes('too long') || err?.message?.includes('starting up');
            if (isTimeout) {
                await new Promise((r) => setTimeout(r, 5000));
                return await apiClient.post(url, data, config);
            }
            throw err;
        }
    },

    // PUT request
    put: async (url, data, config = {}) => {
        try {
            return await apiClient.put(url, data, config);
        } catch (error) {
            throw error;
        }
    },

    // PATCH request
    patch: async (url, data, config = {}) => {
        try {
            return await apiClient.patch(url, data, config);
        } catch (error) {
            throw error;
        }
    },

    // DELETE request
    delete: async (url, config = {}) => {
        try {
            return await apiClient.delete(url, config);
        } catch (error) {
            throw error;
        }
    },

    // Upload file
    uploadFile: async (url, file, onUploadProgress) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            return await apiClient.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress,
            });
        } catch (error) {
            throw error;
        }
    },
};

// API Endpoints (content from staticData.js; only contact & quotes hit backend)
export const API_ENDPOINTS = {
    CONTACT: '/contact',
    QUOTES: '/quotes',
};

export default apiService;
