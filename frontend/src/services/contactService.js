import apiService, { API_ENDPOINTS } from './apiService';

/**
 * Contact Service
 * Handle contact form submissions
 */

// Use real API by default; set REACT_APP_USE_MOCK_DATA='true' only for local dev without backend
const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true';

const contactService = {
    /**
     * Submit contact form
     * @param {Object} contactData - Contact form data
     * @param {string} contactData.name - Sender name
     * @param {string} contactData.email - Sender email
     * @param {string} contactData.phone - Sender phone (optional)
     * @param {string} contactData.subject - Message subject
     * @param {string} contactData.message - Message content
     * @returns {Promise<Object>} Submission response
     */
    submitContactForm: async (contactData) => {
        try {
            // Validate contact data
            const validation = contactService.validateContactData(contactData);
            if (!validation.isValid) {
                throw new Error(validation.errors.join(', '));
            }

            if (USE_MOCK_DATA) {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500));

                const contact = {
                    id: `contact-${Date.now()}`,
                    ...contactData,
                    status: 'received',
                    createdAt: new Date().toISOString(),
                };

                return Promise.resolve({
                    success: true,
                    message: 'Thank you for contacting us! We will get back to you within 24 hours.',
                    data: contact,
                });
            }

            const payload = {
                name: contactData.name,
                email: contactData.email,
                phone: contactData.phone ?? undefined,
                subject: contactData.subject,
                message: contactData.message,
            };
            return await apiService.postWithRetry(API_ENDPOINTS.CONTACT, payload);
        } catch (error) {
            console.error('Error submitting contact form:', error);
            throw error;
        }
    },

    /**
     * Validate contact form data
     * @param {Object} contactData - Contact data to validate
     * @returns {Object} Validation result
     */
    validateContactData: (contactData) => {
        const errors = [];

        // Name validation
        if (!contactData.name || contactData.name.trim().length < 2) {
            errors.push('Valid name is required (minimum 2 characters)');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!contactData.email || !emailRegex.test(contactData.email)) {
            errors.push('Valid email address is required');
        }

        // Phone validation (optional)
        if (contactData.phone) {
            const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
            if (!phoneRegex.test(contactData.phone)) {
                errors.push('Invalid phone number format');
            }
        }

        // Subject validation
        if (!contactData.subject || contactData.subject.trim().length < 3) {
            errors.push('Subject is required (minimum 3 characters)');
        }

        // Message validation
        if (!contactData.message || contactData.message.trim().length < 10) {
            errors.push('Message is required (minimum 10 characters)');
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    },

    /**
     * Send email (for backend integration)
     * @param {Object} emailData - Email data
     * @param {string} emailData.to - Recipient email
     * @param {string} emailData.subject - Email subject
     * @param {string} emailData.body - Email body
     * @param {string} emailData.from - Sender email (optional)
     * @returns {Promise<Object>} Email send response
     */
    sendEmail: async (emailData) => {
        try {
            if (USE_MOCK_DATA) {
                // Simulate email sending
                await new Promise(resolve => setTimeout(resolve, 300));

                return Promise.resolve({
                    success: true,
                    message: 'Email sent successfully',
                });
            }

            return await apiService.post(`${API_ENDPOINTS.CONTACT}/send-email`, emailData);
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    },

    /**
     * Format contact data for email
     * @param {Object} contactData - Contact form data
     * @returns {Object} Formatted email data
     */
    formatContactEmail: (contactData) => {
        return {
            subject: `Contact Form: ${contactData.subject}`,
            body: `
New Contact Form Submission

From: ${contactData.name}
Email: ${contactData.email}
Phone: ${contactData.phone || 'Not provided'}

Subject: ${contactData.subject}

Message:
${contactData.message}

Submitted: ${new Date().toLocaleString()}
      `.trim(),
            ...contactData,
        };
    },

    /**
     * Subscribe to newsletter
     * @param {string} email - Email address
     * @param {string} name - Subscriber name (optional)
     * @returns {Promise<Object>} Subscription response
     */
    subscribeToNewsletter: async (email, name = '') => {
        try {
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                throw new Error('Valid email address is required');
            }

            if (USE_MOCK_DATA) {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 300));

                return Promise.resolve({
                    success: true,
                    message: 'Successfully subscribed to newsletter!',
                });
            }

            return await apiService.post(`${API_ENDPOINTS.CONTACT}/newsletter`, {
                email,
                name,
            });
        } catch (error) {
            console.error('Error subscribing to newsletter:', error);
            throw error;
        }
    },

    /**
     * Request callback
     * @param {Object} callbackData - Callback request data
     * @param {string} callbackData.name - Name
     * @param {string} callbackData.phone - Phone number
     * @param {string} callbackData.preferredTime - Preferred callback time
     * @returns {Promise<Object>} Callback request response
     */
    requestCallback: async (callbackData) => {
        try {
            // Validate callback data
            if (!callbackData.name || callbackData.name.trim().length < 2) {
                throw new Error('Valid name is required');
            }

            const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
            if (!callbackData.phone || !phoneRegex.test(callbackData.phone)) {
                throw new Error('Valid phone number is required');
            }

            if (USE_MOCK_DATA) {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 300));

                return Promise.resolve({
                    success: true,
                    message: 'Callback request received. We will contact you soon!',
                });
            }

            return await apiService.post(`${API_ENDPOINTS.CONTACT}/callback`, callbackData);
        } catch (error) {
            console.error('Error requesting callback:', error);
            throw error;
        }
    },
};

export default contactService;
