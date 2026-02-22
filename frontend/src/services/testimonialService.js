import apiService, { API_ENDPOINTS } from './apiService';

/**
 * Testimonial Service
 * Manage testimonials and reviews
 */

const USE_MOCK_DATA = true; // Set to false when backend is ready

// Mock testimonials data
const mockTestimonials = [
    {
        id: 'testimonial-1',
        name: 'Sarah Johnson',
        role: 'Bride',
        eventType: 'Wedding',
        rating: 5,
        comment: 'Absolutely amazing service! The team went above and beyond to make our wedding day perfect. The tent setup was stunning and everything was executed flawlessly.',
        date: '2024-06-15',
        featured: true,
        image: null,
    },
    {
        id: 'testimonial-2',
        name: 'Michael Chen',
        role: 'Event Coordinator',
        eventType: 'Corporate Event',
        rating: 5,
        comment: 'Professional, reliable, and creative. They transformed our corporate event into something truly special. Highly recommend!',
        date: '2024-05-20',
        featured: true,
        image: null,
    },
    {
        id: 'testimonial-3',
        name: 'Emily Rodriguez',
        role: 'Birthday Party Host',
        eventType: 'Birthday Party',
        rating: 5,
        comment: 'The photo booth was a huge hit at my daughter\'s sweet 16! Everyone loved it and the quality of the prints was excellent.',
        date: '2024-07-10',
        featured: false,
        image: null,
    },
    {
        id: 'testimonial-4',
        name: 'David Thompson',
        role: 'Groom',
        eventType: 'Wedding',
        rating: 5,
        comment: 'From start to finish, the experience was seamless. The equipment was top-notch and the setup crew was incredibly efficient.',
        date: '2024-08-05',
        featured: true,
        image: null,
    },
    {
        id: 'testimonial-5',
        name: 'Jessica Martinez',
        role: 'Event Planner',
        eventType: 'Corporate Event',
        rating: 4,
        comment: 'Great selection of rental items and very responsive customer service. Would definitely work with them again.',
        date: '2024-04-12',
        featured: false,
        image: null,
    },
];

const testimonialService = {
    /**
     * Get all testimonials
     * @returns {Promise<Array>} Array of testimonials
     */
    getAllTestimonials: async () => {
        try {
            if (USE_MOCK_DATA) {
                return Promise.resolve(mockTestimonials);
            }
            return await apiService.get(API_ENDPOINTS.TESTIMONIALS);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            return mockTestimonials;
        }
    },

    /**
     * Get featured testimonials
     * @param {number} limit - Number of testimonials to return
     * @returns {Promise<Array>} Featured testimonials
     */
    getFeaturedTestimonials: async (limit = 3) => {
        try {
            if (USE_MOCK_DATA) {
                const featured = mockTestimonials
                    .filter(t => t.featured)
                    .slice(0, limit);
                return Promise.resolve(featured);
            }
            return await apiService.get(API_ENDPOINTS.FEATURED_TESTIMONIALS, {
                params: { limit },
            });
        } catch (error) {
            console.error('Error fetching featured testimonials:', error);
            return [];
        }
    },

    /**
     * Submit a new testimonial
     * @param {Object} testimonialData - Testimonial data
     * @param {string} testimonialData.name - Customer name
     * @param {string} testimonialData.email - Customer email
     * @param {string} testimonialData.eventType - Type of event
     * @param {number} testimonialData.rating - Rating (1-5)
     * @param {string} testimonialData.comment - Testimonial comment
     * @returns {Promise<Object>} Submission response
     */
    submitTestimonial: async (testimonialData) => {
        try {
            // Validate testimonial data
            const validation = testimonialService.validateTestimonialData(testimonialData);
            if (!validation.isValid) {
                throw new Error(validation.errors.join(', '));
            }

            if (USE_MOCK_DATA) {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500));

                const testimonial = {
                    id: `testimonial-${Date.now()}`,
                    ...testimonialData,
                    date: new Date().toISOString(),
                    featured: false,
                    status: 'pending',
                };

                return Promise.resolve({
                    success: true,
                    message: 'Thank you for your testimonial! It will be reviewed and published soon.',
                    data: testimonial,
                });
            }

            return await apiService.post(API_ENDPOINTS.TESTIMONIALS, testimonialData);
        } catch (error) {
            console.error('Error submitting testimonial:', error);
            throw error;
        }
    },

    /**
     * Validate testimonial data
     * @param {Object} testimonialData - Testimonial data to validate
     * @returns {Object} Validation result
     */
    validateTestimonialData: (testimonialData) => {
        const errors = [];

        // Name validation
        if (!testimonialData.name || testimonialData.name.trim().length < 2) {
            errors.push('Valid name is required (minimum 2 characters)');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!testimonialData.email || !emailRegex.test(testimonialData.email)) {
            errors.push('Valid email address is required');
        }

        // Event type validation
        if (!testimonialData.eventType || testimonialData.eventType.trim().length === 0) {
            errors.push('Event type is required');
        }

        // Rating validation
        if (!testimonialData.rating || testimonialData.rating < 1 || testimonialData.rating > 5) {
            errors.push('Rating must be between 1 and 5');
        }

        // Comment validation
        if (!testimonialData.comment || testimonialData.comment.trim().length < 10) {
            errors.push('Comment is required (minimum 10 characters)');
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    },

    /**
     * Filter testimonials by rating
     * @param {number} minRating - Minimum rating (1-5)
     * @returns {Promise<Array>} Filtered testimonials
     */
    filterTestimonialsByRating: async (minRating) => {
        try {
            if (USE_MOCK_DATA) {
                const filtered = mockTestimonials.filter(t => t.rating >= minRating);
                return Promise.resolve(filtered);
            }
            return await apiService.get(API_ENDPOINTS.TESTIMONIALS, {
                params: { minRating },
            });
        } catch (error) {
            console.error('Error filtering testimonials by rating:', error);
            return [];
        }
    },

    /**
     * Get testimonials by event type
     * @param {string} eventType - Event type
     * @returns {Promise<Array>} Filtered testimonials
     */
    getTestimonialsByEventType: async (eventType) => {
        try {
            if (USE_MOCK_DATA) {
                const filtered = mockTestimonials.filter(
                    t => t.eventType.toLowerCase() === eventType.toLowerCase()
                );
                return Promise.resolve(filtered);
            }
            return await apiService.get(API_ENDPOINTS.TESTIMONIALS, {
                params: { eventType },
            });
        } catch (error) {
            console.error('Error fetching testimonials by event type:', error);
            return [];
        }
    },

    /**
     * Get average rating
     * @returns {Promise<number>} Average rating
     */
    getAverageRating: async () => {
        try {
            if (USE_MOCK_DATA) {
                const total = mockTestimonials.reduce((sum, t) => sum + t.rating, 0);
                const average = total / mockTestimonials.length;
                return Promise.resolve(Math.round(average * 10) / 10);
            }
            return await apiService.get(`${API_ENDPOINTS.TESTIMONIALS}/average-rating`);
        } catch (error) {
            console.error('Error calculating average rating:', error);
            return 0;
        }
    },

    /**
     * Get testimonial statistics
     * @returns {Promise<Object>} Statistics object
     */
    getTestimonialStats: async () => {
        try {
            if (USE_MOCK_DATA) {
                const total = mockTestimonials.length;
                const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

                mockTestimonials.forEach(t => {
                    ratingCounts[t.rating]++;
                });

                const averageRating = await testimonialService.getAverageRating();

                return Promise.resolve({
                    total,
                    averageRating,
                    ratingCounts,
                    featured: mockTestimonials.filter(t => t.featured).length,
                });
            }
            return await apiService.get(`${API_ENDPOINTS.TESTIMONIALS}/stats`);
        } catch (error) {
            console.error('Error fetching testimonial stats:', error);
            return null;
        }
    },
};

export default testimonialService;
