import { inventory, categories, getItemsByCategory, getItemById, getAllItems } from '@/data/staticData';
import apiService, { API_ENDPOINTS } from './apiService';

/**
 * Inventory Service
 * Manage inventory items, categories, and filtering logic
 */

const USE_MOCK_DATA = true; // Set to false when backend is ready

const inventoryService = {
    /**
     * Get all inventory items
     * @returns {Promise<Array>} Array of inventory items
     */
    getAllInventory: async () => {
        try {
            if (USE_MOCK_DATA) {
                return Promise.resolve(getAllItems());
            }
            return await apiService.get(API_ENDPOINTS.INVENTORY);
        } catch (error) {
            console.error('Error fetching inventory:', error);
            // Fallback to mock data on error
            return getAllItems();
        }
    },

    /**
     * Get inventory items by category
     * @param {string} category - Category name
     * @returns {Promise<Array>} Filtered inventory items
     */
    getInventoryByCategory: async (category) => {
        try {
            if (USE_MOCK_DATA) {
                return Promise.resolve(getItemsByCategory(category));
            }
            return await apiService.get(API_ENDPOINTS.INVENTORY_BY_CATEGORY(category));
        } catch (error) {
            console.error('Error fetching inventory by category:', error);
            return getItemsByCategory(category);
        }
    },

    /**
     * Get single inventory item by ID
     * @param {string} id - Item ID
     * @returns {Promise<Object|null>} Inventory item or null
     */
    getInventoryById: async (id) => {
        try {
            if (USE_MOCK_DATA) {
                return Promise.resolve(getItemById(id));
            }
            return await apiService.get(API_ENDPOINTS.INVENTORY_BY_ID(id));
        } catch (error) {
            console.error('Error fetching inventory item:', error);
            return getItemById(id);
        }
    },

    /**
     * Get all available categories
     * @returns {Promise<Array>} Array of category names
     */
    getCategories: async () => {
        try {
            if (USE_MOCK_DATA) {
                return Promise.resolve(categories);
            }
            return await apiService.get(`${API_ENDPOINTS.INVENTORY}/categories`);
        } catch (error) {
            console.error('Error fetching categories:', error);
            return categories;
        }
    },

    /**
     * Search inventory items
     * @param {string} query - Search query
     * @returns {Promise<Array>} Matching inventory items
     */
    searchInventory: async (query) => {
        try {
            if (USE_MOCK_DATA) {
                const lowerQuery = query.toLowerCase();
                const results = getAllItems().filter(item =>
                    item.name.toLowerCase().includes(lowerQuery) ||
                    item.description.toLowerCase().includes(lowerQuery) ||
                    item.shortDescription.toLowerCase().includes(lowerQuery) ||
                    item.category.toLowerCase().includes(lowerQuery)
                );
                return Promise.resolve(results);
            }
            return await apiService.get(`${API_ENDPOINTS.INVENTORY}/search`, { params: { q: query } });
        } catch (error) {
            console.error('Error searching inventory:', error);
            return [];
        }
    },

    /**
     * Filter inventory with advanced options
     * @param {Object} filters - Filter options
     * @param {string} filters.category - Category filter
     * @param {number} filters.minCapacity - Minimum capacity
     * @param {number} filters.maxCapacity - Maximum capacity
     * @param {string} filters.color - Color filter
     * @returns {Promise<Array>} Filtered inventory items
     */
    filterInventory: async (filters = {}) => {
        try {
            if (USE_MOCK_DATA) {
                let results = getAllItems();

                // Apply category filter
                if (filters.category) {
                    results = results.filter(item => item.category === filters.category);
                }

                // Apply capacity filter
                if (filters.minCapacity) {
                    results = results.filter(item => {
                        const capacity = item.specs?.capacity;
                        if (!capacity) return false;
                        const capacityNum = parseInt(capacity.match(/\d+/)?.[0] || 0);
                        return capacityNum >= filters.minCapacity;
                    });
                }

                if (filters.maxCapacity) {
                    results = results.filter(item => {
                        const capacity = item.specs?.capacity;
                        if (!capacity) return false;
                        const capacityNum = parseInt(capacity.match(/\d+/)?.[0] || 0);
                        return capacityNum <= filters.maxCapacity;
                    });
                }

                // Apply color filter
                if (filters.color) {
                    results = results.filter(item =>
                        item.specs?.color?.toLowerCase().includes(filters.color.toLowerCase())
                    );
                }

                return Promise.resolve(results);
            }
            return await apiService.get(API_ENDPOINTS.INVENTORY, { params: filters });
        } catch (error) {
            console.error('Error filtering inventory:', error);
            return [];
        }
    },

    /**
     * Get featured/popular items
     * @param {number} limit - Number of items to return
     * @returns {Promise<Array>} Featured inventory items
     */
    getFeaturedItems: async (limit = 6) => {
        try {
            if (USE_MOCK_DATA) {
                // Return first N items from each category
                const featured = [];
                categories.forEach(category => {
                    const categoryItems = getItemsByCategory(category);
                    if (categoryItems.length > 0) {
                        featured.push(categoryItems[0]);
                    }
                });
                return Promise.resolve(featured.slice(0, limit));
            }
            return await apiService.get(`${API_ENDPOINTS.INVENTORY}/featured`, { params: { limit } });
        } catch (error) {
            console.error('Error fetching featured items:', error);
            return [];
        }
    },



    /**
     * Get related items (same category, different ID)
     * @param {string} itemId - Current item ID
     * @param {number} limit - Number of related items
     * @returns {Promise<Array>} Related inventory items
     */
    getRelatedItems: async (itemId, limit = 4) => {
        try {
            if (USE_MOCK_DATA) {
                const currentItem = getItemById(itemId);
                if (!currentItem) return Promise.resolve([]);

                const relatedItems = getItemsByCategory(currentItem.category)
                    .filter(item => item.id !== itemId)
                    .slice(0, limit);

                return Promise.resolve(relatedItems);
            }
            return await apiService.get(`${API_ENDPOINTS.INVENTORY_BY_ID(itemId)}/related`, { params: { limit } });
        } catch (error) {
            console.error('Error fetching related items:', error);
            return [];
        }
    },
};

export default inventoryService;
