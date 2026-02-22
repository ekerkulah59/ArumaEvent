import apiService, { API_ENDPOINTS } from './apiService';

/**
 * FAQ Service
 * Manage FAQs and help content
 */

const USE_MOCK_DATA = true; // Set to false when backend is ready

// Mock FAQ data
const mockFAQs = [
    {
        id: 'faq-1',
        category: 'General',
        question: 'How far in advance should I book my rental items?',
        answer: 'We recommend booking at least 2-4 weeks in advance for most items. For large events or peak season (May-October), we suggest booking 2-3 months ahead to ensure availability.',
        order: 1,
    },
    {
        id: 'faq-2',
        category: 'General',
        question: 'What is your cancellation policy?',
        answer: 'Cancellations made 14+ days before the event receive a full refund. Cancellations made 7-13 days before receive a 50% refund. Cancellations within 7 days are non-refundable.',
        order: 2,
    },
    {
        id: 'faq-3',
        category: 'Delivery & Setup',
        question: 'Do you provide delivery and setup services?',
        answer: 'Yes! We offer professional delivery and setup for all tent structures and large orders. Smaller items can be picked up from our location. Delivery fees vary based on distance and order size.',
        order: 1,
    },
    {
        id: 'faq-4',
        category: 'Delivery & Setup',
        question: 'How much advance notice do you need for delivery?',
        answer: 'We require at least 48 hours notice for delivery scheduling. For tent installations, we need 72 hours notice to ensure proper setup time.',
        order: 2,
    },
    {
        id: 'faq-5',
        category: 'Pricing',
        question: 'How is rental pricing calculated?',
        answer: 'Pricing is based on the item type, rental duration, quantity, and delivery requirements. We offer package deals for complete event setups. Contact us for a detailed quote.',
        order: 1,
    },
    {
        id: 'faq-6',
        category: 'Pricing',
        question: 'Do you offer discounts for large orders?',
        answer: 'Yes! We offer volume discounts for large orders and package deals for complete event setups. Contact us for a custom quote.',
        order: 2,
    },
    {
        id: 'faq-7',
        category: 'Equipment',
        question: 'What condition are the rental items in?',
        answer: 'All our rental items are professionally cleaned, inspected, and maintained after each use. We take pride in providing high-quality, well-maintained equipment.',
        order: 1,
    },
    {
        id: 'faq-8',
        category: 'Equipment',
        question: 'What happens if an item is damaged during my event?',
        answer: 'Minor wear and tear is expected and covered. Significant damage or loss will be charged based on repair or replacement costs. We recommend reviewing items upon delivery.',
        order: 2,
    },
    {
        id: 'faq-9',
        category: 'Payment',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, debit cards, checks, and bank transfers. A deposit is required to secure your reservation, with the balance due before delivery.',
        order: 1,
    },
    {
        id: 'faq-10',
        category: 'Payment',
        question: 'When is payment due?',
        answer: 'A 50% deposit is required at booking. The remaining balance is due 7 days before your event date. We accept payment via credit card, check, or bank transfer.',
        order: 2,
    },
];

const faqService = {
    /**
     * Get all FAQs
     * @returns {Promise<Array>} Array of FAQs
     */
    getAllFAQs: async () => {
        try {
            if (USE_MOCK_DATA) {
                return Promise.resolve(mockFAQs);
            }
            return await apiService.get(API_ENDPOINTS.FAQS);
        } catch (error) {
            console.error('Error fetching FAQs:', error);
            return mockFAQs;
        }
    },

    /**
     * Get FAQs by category
     * @param {string} category - Category name
     * @returns {Promise<Array>} Filtered FAQs
     */
    getFAQsByCategory: async (category) => {
        try {
            if (USE_MOCK_DATA) {
                const filtered = mockFAQs
                    .filter(faq => faq.category === category)
                    .sort((a, b) => a.order - b.order);
                return Promise.resolve(filtered);
            }
            return await apiService.get(API_ENDPOINTS.FAQ_BY_CATEGORY(category));
        } catch (error) {
            console.error('Error fetching FAQs by category:', error);
            return [];
        }
    },

    /**
     * Search FAQs
     * @param {string} query - Search query
     * @returns {Promise<Array>} Matching FAQs
     */
    searchFAQs: async (query) => {
        try {
            if (USE_MOCK_DATA) {
                const lowerQuery = query.toLowerCase();
                const results = mockFAQs.filter(
                    faq =>
                        faq.question.toLowerCase().includes(lowerQuery) ||
                        faq.answer.toLowerCase().includes(lowerQuery) ||
                        faq.category.toLowerCase().includes(lowerQuery)
                );
                return Promise.resolve(results);
            }
            return await apiService.get(`${API_ENDPOINTS.FAQS}/search`, {
                params: { q: query },
            });
        } catch (error) {
            console.error('Error searching FAQs:', error);
            return [];
        }
    },

    /**
     * Get FAQ categories
     * @returns {Promise<Array>} Array of category names
     */
    getFAQCategories: async () => {
        try {
            if (USE_MOCK_DATA) {
                const categories = [...new Set(mockFAQs.map(faq => faq.category))];
                return Promise.resolve(categories.sort());
            }
            return await apiService.get(`${API_ENDPOINTS.FAQS}/categories`);
        } catch (error) {
            console.error('Error fetching FAQ categories:', error);
            return [];
        }
    },

    /**
     * Get FAQs grouped by category
     * @returns {Promise<Object>} FAQs grouped by category
     */
    getFAQsGroupedByCategory: async () => {
        try {
            if (USE_MOCK_DATA) {
                const grouped = {};
                mockFAQs.forEach(faq => {
                    if (!grouped[faq.category]) {
                        grouped[faq.category] = [];
                    }
                    grouped[faq.category].push(faq);
                });

                // Sort FAQs within each category by order
                Object.keys(grouped).forEach(category => {
                    grouped[category].sort((a, b) => a.order - b.order);
                });

                return Promise.resolve(grouped);
            }
            return await apiService.get(`${API_ENDPOINTS.FAQS}/grouped`);
        } catch (error) {
            console.error('Error fetching grouped FAQs:', error);
            return {};
        }
    },

    /**
     * Get popular/featured FAQs
     * @param {number} limit - Number of FAQs to return
     * @returns {Promise<Array>} Popular FAQs
     */
    getPopularFAQs: async (limit = 5) => {
        try {
            if (USE_MOCK_DATA) {
                // Return first FAQ from each category
                const categories = [...new Set(mockFAQs.map(faq => faq.category))];
                const popular = categories
                    .map(category => mockFAQs.find(faq => faq.category === category))
                    .filter(Boolean)
                    .slice(0, limit);
                return Promise.resolve(popular);
            }
            return await apiService.get(`${API_ENDPOINTS.FAQS}/popular`, {
                params: { limit },
            });
        } catch (error) {
            console.error('Error fetching popular FAQs:', error);
            return [];
        }
    },

    /**
     * Submit a new FAQ question
     * @param {Object} questionData - Question data
     * @param {string} questionData.name - Asker name
     * @param {string} questionData.email - Asker email
     * @param {string} questionData.question - Question text
     * @param {string} questionData.category - Question category (optional)
     * @returns {Promise<Object>} Submission response
     */
    submitQuestion: async (questionData) => {
        try {
            // Validate question data
            if (!questionData.name || questionData.name.trim().length < 2) {
                throw new Error('Valid name is required');
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!questionData.email || !emailRegex.test(questionData.email)) {
                throw new Error('Valid email address is required');
            }

            if (!questionData.question || questionData.question.trim().length < 10) {
                throw new Error('Question must be at least 10 characters');
            }

            if (USE_MOCK_DATA) {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500));

                return Promise.resolve({
                    success: true,
                    message: 'Thank you for your question! We will review it and add it to our FAQ if appropriate.',
                });
            }

            return await apiService.post(`${API_ENDPOINTS.FAQS}/submit`, questionData);
        } catch (error) {
            console.error('Error submitting question:', error);
            throw error;
        }
    },
};

export default faqService;
