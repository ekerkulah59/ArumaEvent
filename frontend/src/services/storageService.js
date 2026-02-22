/**
 * Storage Service
 * Handle localStorage and sessionStorage operations
 */

const storageService = {
    // ==================== LocalStorage ====================

    /**
     * Save data to localStorage
     * @param {string} key - Storage key
     * @param {any} data - Data to store (will be JSON stringified)
     * @returns {boolean} Success status
     */
    saveToLocalStorage: (key, data) => {
        try {
            const serializedData = JSON.stringify(data);
            localStorage.setItem(key, serializedData);
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },

    /**
     * Get data from localStorage
     * @param {string} key - Storage key
     * @param {any} defaultValue - Default value if key doesn't exist
     * @returns {any} Retrieved data or default value
     */
    getFromLocalStorage: (key, defaultValue = null) => {
        try {
            const serializedData = localStorage.getItem(key);
            if (serializedData === null) {
                return defaultValue;
            }
            return JSON.parse(serializedData);
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return defaultValue;
        }
    },

    /**
     * Remove data from localStorage
     * @param {string} key - Storage key
     * @returns {boolean} Success status
     */
    removeFromLocalStorage: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },

    /**
     * Clear all localStorage
     * @returns {boolean} Success status
     */
    clearLocalStorage: () => {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    },

    /**
     * Check if key exists in localStorage
     * @param {string} key - Storage key
     * @returns {boolean} Existence status
     */
    hasInLocalStorage: (key) => {
        return localStorage.getItem(key) !== null;
    },

    // ==================== SessionStorage ====================

    /**
     * Save data to sessionStorage
     * @param {string} key - Storage key
     * @param {any} data - Data to store (will be JSON stringified)
     * @returns {boolean} Success status
     */
    saveToSessionStorage: (key, data) => {
        try {
            const serializedData = JSON.stringify(data);
            sessionStorage.setItem(key, serializedData);
            return true;
        } catch (error) {
            console.error('Error saving to sessionStorage:', error);
            return false;
        }
    },

    /**
     * Get data from sessionStorage
     * @param {string} key - Storage key
     * @param {any} defaultValue - Default value if key doesn't exist
     * @returns {any} Retrieved data or default value
     */
    getFromSessionStorage: (key, defaultValue = null) => {
        try {
            const serializedData = sessionStorage.getItem(key);
            if (serializedData === null) {
                return defaultValue;
            }
            return JSON.parse(serializedData);
        } catch (error) {
            console.error('Error reading from sessionStorage:', error);
            return defaultValue;
        }
    },

    /**
     * Remove data from sessionStorage
     * @param {string} key - Storage key
     * @returns {boolean} Success status
     */
    removeFromSessionStorage: (key) => {
        try {
            sessionStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from sessionStorage:', error);
            return false;
        }
    },

    /**
     * Clear all sessionStorage
     * @returns {boolean} Success status
     */
    clearSessionStorage: () => {
        try {
            sessionStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing sessionStorage:', error);
            return false;
        }
    },

    /**
     * Check if key exists in sessionStorage
     * @param {string} key - Storage key
     * @returns {boolean} Existence status
     */
    hasInSessionStorage: (key) => {
        return sessionStorage.getItem(key) !== null;
    },

    // ==================== Utility Methods ====================

    /**
     * Get storage size in bytes
     * @param {string} storageType - 'local' or 'session'
     * @returns {number} Size in bytes
     */
    getStorageSize: (storageType = 'local') => {
        const storage = storageType === 'local' ? localStorage : sessionStorage;
        let size = 0;
        for (let key in storage) {
            if (storage.hasOwnProperty(key)) {
                size += storage[key].length + key.length;
            }
        }
        return size;
    },

    /**
     * Get all keys from storage
     * @param {string} storageType - 'local' or 'session'
     * @returns {string[]} Array of keys
     */
    getAllKeys: (storageType = 'local') => {
        const storage = storageType === 'local' ? localStorage : sessionStorage;
        return Object.keys(storage);
    },
};

// Storage keys constants
export const STORAGE_KEYS = {
    AUTH_TOKEN: 'authToken',
    USER_DATA: 'userData',
    CART: 'cart',
    QUOTE_DRAFT: 'quoteDraft',
    RENTAL_DRAFT: 'rentalDraft',
    PREFERENCES: 'userPreferences',
    RECENT_SEARCHES: 'recentSearches',
    FAVORITES: 'favorites',
};

export default storageService;
