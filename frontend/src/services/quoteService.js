import apiService, { API_ENDPOINTS } from './apiService';
import storageService, { STORAGE_KEYS } from './storageService';

/**
 * Quote Service
 * Manage quote requests and submissions
 */

// Use real API by default; set REACT_APP_USE_MOCK_DATA='true' only for local dev without backend
const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true';

const quoteService = {
    /**
     * Submit a quote request
     * @param {Object} quoteData - Quote request data
     * @param {string} quoteData.name - Customer name
     * @param {string} quoteData.email - Customer email
     * @param {string} quoteData.phone - Customer phone
     * @param {string} quoteData.eventType - Type of event
     * @param {string} quoteData.eventDate - Event date (ISO string)
     * @param {string} quoteData.eventLocation - Event location
     * @param {number} quoteData.guestCount - Number of guests
     * @param {Array} quoteData.items - Array of requested items
     * @param {string} quoteData.message - Additional message/requirements
     * @returns {Promise<Object>} Quote submission response
     */
    submitQuoteRequest: async (quoteData) => {
        try {
            // Validate quote data
            const validation = quoteService.validateQuoteData(quoteData);
            if (!validation.isValid) {
                throw new Error(validation.errors.join(', '));
            }

            if (USE_MOCK_DATA) {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500));

                const quote = {
                    id: `quote-${Date.now()}`,
                    ...quoteData,
                    status: 'pending',
                    createdAt: new Date().toISOString(),
                };

                // Save to localStorage
                const existingQuotes = storageService.getFromLocalStorage('quotes', []);
                existingQuotes.push(quote);
                storageService.saveToLocalStorage('quotes', existingQuotes);

                return Promise.resolve({
                    success: true,
                    message: 'Quote request submitted successfully. The Aruma Events team will contact you within 24 hours.',
                    data: quote,
                });
            }

            // Backend expects snake_case + eventLocation (alias)
            const payload = {
                name: quoteData.name,
                email: quoteData.email,
                phone: quoteData.phone,
                event_type: quoteData.eventType,
                event_date: quoteData.eventDate ?? undefined,
                guest_count: quoteData.guestCount ?? undefined,
                eventLocation: quoteData.eventLocation ?? undefined,
                message: quoteData.message,
                service_id: quoteData.serviceId ?? undefined,
                rental_id: quoteData.rentalId ?? undefined,
                items: quoteData.items ?? undefined,
            };
            return await apiService.postWithRetry(API_ENDPOINTS.QUOTES, payload);
        } catch (error) {
            console.error('Error submitting quote request:', error);
            throw error;
        }
    },

    /**
     * Validate quote data
     * @param {Object} quoteData - Quote data to validate
     * @returns {Object} Validation result
     */
    validateQuoteData: (quoteData) => {
        const errors = [];

        // Name validation
        if (!quoteData.name || quoteData.name.trim().length < 2) {
            errors.push('Valid name is required (minimum 2 characters)');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!quoteData.email || !emailRegex.test(quoteData.email)) {
            errors.push('Valid email address is required');
        }

        // Phone validation
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!quoteData.phone || !phoneRegex.test(quoteData.phone)) {
            errors.push('Valid phone number is required (minimum 10 digits)');
        }

        // Event type validation
        if (!quoteData.eventType || quoteData.eventType.trim().length === 0) {
            errors.push('Event type is required');
        }

        // Event date validation (optional for contact/quote form; validate format when provided)
        if (quoteData.eventDate) {
            const eventDate = new Date(quoteData.eventDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (isNaN(eventDate.getTime())) {
                errors.push('Invalid event date');
            } else if (eventDate < today) {
                errors.push('Event date cannot be in the past');
            }
        }

        // Guest count validation (optional; when provided must be >= 1)
        if (quoteData.guestCount != null && quoteData.guestCount !== '' && Number(quoteData.guestCount) < 1) {
            errors.push('Guest count must be at least 1');
        }

        // Items validation (optional but recommended)
        if (quoteData.items && !Array.isArray(quoteData.items)) {
            errors.push('Items must be an array');
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    },

    /**
     * Format quote data for email/backend
     * @param {Object} quoteData - Quote data
     * @returns {Object} Formatted quote data
     */
    formatQuoteForEmail: (quoteData) => {
        let eventDate = 'Not specified';
        if (quoteData.eventDate) {
            const d = new Date(quoteData.eventDate);
            if (!isNaN(d.getTime())) {
                eventDate = d.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });
            }
        }

        return {
            subject: `Quote Request - ${quoteData.eventType} on ${eventDate}`,
            body: `
New Quote Request — Aruma Events

Customer Information:
- Name: ${quoteData.name}
- Email: ${quoteData.email}
- Phone: ${quoteData.phone}

Event Details:
- Event Type: ${quoteData.eventType}
- Event Date: ${eventDate}
- Location: ${quoteData.eventLocation || 'Not specified'}
- Guest Count: ${quoteData.guestCount}

Requested Items:
${quoteData.items && quoteData.items.length > 0
                    ? quoteData.items.map(item => `- ${item.name} (Quantity: ${item.quantity || 1})`).join('\n')
                    : 'No specific items requested'}

Additional Message:
${quoteData.message || 'No additional message'}

Submitted: ${new Date().toLocaleString()}
      `.trim(),
            ...quoteData,
        };
    },

    /**
     * Save quote draft to localStorage
     * @param {Object} quoteData - Quote draft data
     * @returns {boolean} Success status
     */
    saveQuoteLocally: (quoteData) => {
        try {
            return storageService.saveToLocalStorage(STORAGE_KEYS.QUOTE_DRAFT, quoteData);
        } catch (error) {
            console.error('Error saving quote draft:', error);
            return false;
        }
    },

    /**
     * Get quote draft from localStorage
     * @returns {Object|null} Quote draft data
     */
    getQuoteDraft: () => {
        try {
            return storageService.getFromLocalStorage(STORAGE_KEYS.QUOTE_DRAFT, null);
        } catch (error) {
            console.error('Error getting quote draft:', error);
            return null;
        }
    },

    /**
     * Clear quote draft from localStorage
     * @returns {boolean} Success status
     */
    clearQuoteDraft: () => {
        try {
            return storageService.removeFromLocalStorage(STORAGE_KEYS.QUOTE_DRAFT);
        } catch (error) {
            console.error('Error clearing quote draft:', error);
            return false;
        }
    },

    /**
     * Get all submitted quotes (from localStorage)
     * @returns {Array} Array of quotes
     */
    getAllQuotes: () => {
        try {
            return storageService.getFromLocalStorage('quotes', []);
        } catch (error) {
            console.error('Error getting quotes:', error);
            return [];
        }
    },

    /**
     * Get quote by ID
     * @param {string} quoteId - Quote ID
     * @returns {Promise<Object|null>} Quote details
     */
    getQuoteById: async (quoteId) => {
        try {
            const quotes = storageService.getFromLocalStorage('quotes', []);
            const quote = quotes.find(q => q.id === quoteId);
            return quote || null;
        } catch (error) {
            console.error('Error fetching quote:', error);
            return null;
        }
    },

    /**
     * Calculate estimated quote total (basic calculation)
     * @param {Array} items - Array of items with quantities
     * @param {number} guestCount - Number of guests
     * @returns {Object} Estimated cost breakdown
     */
    calculateEstimatedQuote: (items, guestCount) => {
        try {
            let itemsTotal = 0;

            if (items && items.length > 0) {
                items.forEach(item => {
                    const basePrice = 50; // Mock base price
                    const quantity = item.quantity || 1;
                    itemsTotal += basePrice * quantity;
                });
            }

            // Base package pricing based on guest count
            let basePackage = 0;
            if (guestCount <= 50) {
                basePackage = 500;
            } else if (guestCount <= 100) {
                basePackage = 1000;
            } else if (guestCount <= 200) {
                basePackage = 2000;
            } else {
                basePackage = 3000;
            }

            const subtotal = itemsTotal + basePackage;
            const tax = subtotal * 0.08;
            const total = subtotal + tax;

            return {
                itemsTotal,
                basePackage,
                subtotal,
                tax,
                total,
                note: 'This is an estimated quote. Final pricing will be provided after review.',
            };
        } catch (error) {
            console.error('Error calculating estimated quote:', error);
            return null;
        }
    },
};

export default quoteService;
