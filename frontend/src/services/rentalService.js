import apiService, { API_ENDPOINTS } from './apiService';
import storageService, { STORAGE_KEYS } from './storageService';

/**
 * Rental Service
 * Handle rental bookings and availability management.
 * Uses backend quotes API for rental quote requests.
 * Availability, cost calculation, and history require backend support.
 */

const rentalService = {
    /**
     * Create a rental request (submits as quote request via /quotes)
     * @param {Object} rentalData - Rental request data
     * @param {string} rentalData.itemId - Item ID
     * @param {string} rentalData.itemName - Item name
     * @param {string} rentalData.startDate - Start date (ISO string)
     * @param {string} rentalData.endDate - End date (ISO string)
     * @param {string} rentalData.customerName - Customer name
     * @param {string} rentalData.customerEmail - Customer email
     * @param {string} rentalData.customerPhone - Customer phone
     * @param {number} rentalData.quantity - Quantity
     * @param {string} rentalData.notes - Additional notes
     * @returns {Promise<Object>} Rental request response
     */
    createRentalRequest: async (rentalData) => {
        try {
            const validation = rentalService.validateRentalData(rentalData);
            if (!validation.isValid) {
                throw new Error(validation.errors.join(', '));
            }

            const message = [
                `Rental request for ${rentalData.itemName}`,
                `Quantity: ${rentalData.quantity}`,
                `Dates: ${rentalData.startDate} to ${rentalData.endDate}`,
                rentalData.notes ? `Notes: ${rentalData.notes}` : '',
            ]
                .filter(Boolean)
                .join('\n');

            const quotePayload = {
                name: rentalData.customerName,
                email: rentalData.customerEmail,
                phone: rentalData.customerPhone,
                event_type: 'rental',
                event_date: rentalData.startDate,
                guest_count: null,
                message,
                rental_id: rentalData.itemId,
            };

            const data = await apiService.postWithRetry(API_ENDPOINTS.QUOTES, quotePayload);
            return {
                success: true,
                message: 'Rental request submitted successfully',
                data,
            };
        } catch (error) {
            console.error('Error creating rental request:', error);
            throw error;
        }
    },

    /**
     * Check item availability for given dates.
     * Requires backend /rentals/availability endpoint.
     */
    checkAvailability: async (itemId, startDate, endDate) => {
        try {
            const result = await apiService.post(API_ENDPOINTS.CHECK_AVAILABILITY, {
                itemId,
                startDate,
                endDate,
            });
            return result;
        } catch (error) {
            console.error('Error checking availability:', error);
            return {
                available: false,
                message: 'Unable to check availability at this time',
            };
        }
    },

    /**
     * Calculate rental cost.
     * Requires backend /rentals/calculate endpoint.
     */
    calculateRentalCost: async (items, duration) => {
        try {
            return await apiService.post(`${API_ENDPOINTS.RENTALS}/calculate`, {
                items,
                duration,
            });
        } catch (error) {
            console.error('Error calculating rental cost:', error);
            return null;
        }
    },

    /**
     * Get rental history (requires authentication).
     * Returns [] until backend adds user-specific rental request history endpoint.
     */
    getRentalHistory: async () => {
        try {
            // TODO: Backend needs GET /rental-requests or similar for user's rental history
            return [];
        } catch (error) {
            console.error('Error fetching rental history:', error);
            return [];
        }
    },

    /**
     * Get rental item by ID (inventory item, not rental request).
     * For rental request history by ID, backend support is required.
     */
    getRentalById: async (rentalId) => {
        try {
            return await apiService.get(API_ENDPOINTS.RENTAL_BY_ID(rentalId));
        } catch (error) {
            console.error('Error fetching rental:', error);
            return null;
        }
    },

    /**
     * Validate rental dates
     * @param {string} startDate - Start date (ISO string)
     * @param {string} endDate - End date (ISO string)
     * @returns {Object} Validation result
     */
    validateRentalDates: (startDate, endDate) => {
        const errors = [];
        const start = new Date(startDate);
        const end = new Date(endDate);
        const now = new Date();

        // Reset time to start of day for comparison
        now.setHours(0, 0, 0, 0);

        if (isNaN(start.getTime())) {
            errors.push('Invalid start date');
        }

        if (isNaN(end.getTime())) {
            errors.push('Invalid end date');
        }

        if (start < now) {
            errors.push('Start date cannot be in the past');
        }

        if (end <= start) {
            errors.push('End date must be after start date');
        }

        const daysDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        if (daysDiff < 1) {
            errors.push('Rental must be at least 1 day');
        }

        return {
            isValid: errors.length === 0,
            errors,
            duration: daysDiff,
        };
    },

    /**
     * Validate rental data
     * @param {Object} rentalData - Rental data to validate
     * @returns {Object} Validation result
     */
    validateRentalData: (rentalData) => {
        const errors = [];

        if (!rentalData.itemId) {
            errors.push('Item ID is required');
        }

        if (!rentalData.customerName || rentalData.customerName.trim().length < 2) {
            errors.push('Valid customer name is required');
        }

        if (!rentalData.customerEmail || !rentalData.customerEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            errors.push('Valid email address is required');
        }

        if (!rentalData.customerPhone || rentalData.customerPhone.trim().length < 10) {
            errors.push('Valid phone number is required');
        }

        if (!rentalData.startDate || !rentalData.endDate) {
            errors.push('Start and end dates are required');
        } else {
            const dateValidation = rentalService.validateRentalDates(
                rentalData.startDate,
                rentalData.endDate
            );
            if (!dateValidation.isValid) {
                errors.push(...dateValidation.errors);
            }
        }

        if (!rentalData.quantity || rentalData.quantity < 1) {
            errors.push('Quantity must be at least 1');
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    },

    /**
     * Save rental draft to localStorage
     * @param {Object} rentalData - Rental draft data
     * @returns {boolean} Success status
     */
    saveRentalDraft: (rentalData) => {
        try {
            return storageService.saveToLocalStorage(STORAGE_KEYS.RENTAL_DRAFT, rentalData);
        } catch (error) {
            console.error('Error saving rental draft:', error);
            return false;
        }
    },

    /**
     * Get rental draft from localStorage
     * @returns {Object|null} Rental draft data
     */
    getRentalDraft: () => {
        try {
            return storageService.getFromLocalStorage(STORAGE_KEYS.RENTAL_DRAFT, null);
        } catch (error) {
            console.error('Error getting rental draft:', error);
            return null;
        }
    },

    /**
     * Clear rental draft from localStorage
     * @returns {boolean} Success status
     */
    clearRentalDraft: () => {
        try {
            return storageService.removeFromLocalStorage(STORAGE_KEYS.RENTAL_DRAFT);
        } catch (error) {
            console.error('Error clearing rental draft:', error);
            return false;
        }
    },
};

export default rentalService;
