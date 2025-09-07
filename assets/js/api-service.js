/**
 * API Service for handling API calls
 * Updated to include certificates, team, and contact endpoints
 */

const API_BASE_URL = 'https://kingdom-spices-herbs-backend-dashbo.vercel.app/api';

const ApiService = {
    /**
     * Fetch all categories
     * @returns {Promise<Array>} - Array of categories
     */
    getCategories: async function() {
        try {
            const response = await fetch(`${API_BASE_URL}/categories`);
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    },

    /**
     * Fetch all products
     * @returns {Promise<Array>} - Array of products
     */
    getProducts: async function() {
        try {
            const response = await fetch(`${API_BASE_URL}/products`);
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    },

    /**
     * Fetch a single product by ID
     * @param {string} id - Product ID
     * @returns {Promise<Object|null>} - Product object or null if not found
     */
    getProductById: async function(id) {
        try {
            // Direct API call to get product by ID
            const response = await fetch(`${API_BASE_URL}/products/${id}`);
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            return null;
        }
    },

    /**
     * Fetch products by category
     * @param {string} categoryId - Category ID
     * @returns {Promise<Array>} - Array of products in the category
     */
    getProductsByCategory: async function(categoryId) {
        try {
            const products = await this.getProducts();
            return products.filter(product => product.category._id === categoryId);
        } catch (error) {
            console.error('Error fetching products by category:', error);
            return [];
        }
    },

    /**
     * Format date to a readable string
     * @param {string} dateString - ISO date string
     * @returns {string} - Formatted date string
     */
    formatDate: function(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    },

    /**
     * Fetch all certificates
     * @returns {Promise<Object>} - Certificates data with success status
     */
    getCertificates: async function() {
        try {
            const response = await fetch(`${API_BASE_URL}/certificates`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching certificates:', error);
            return { success: false, data: [] };
        }
    },

    /**
     * Fetch all team members
     * @returns {Promise<Object>} - Team data with success status
     */
    getTeam: async function() {
        try {
            const response = await fetch(`${API_BASE_URL}/team`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching team:', error);
            return { success: false, data: [] };
        }
    },

    /**
     * Fetch contact information
     * @returns {Promise<Object>} - Contact data with success status
     */
    getContact: async function() {
        try {
            const response = await fetch(`${API_BASE_URL}/contact`);
            const data = await response.json();
            console.log('Raw API response:', data);
            
            // Ensure we have a properly formatted response
            if (!data.success && data.data) {
                // If the API doesn't include success flag but has data
                return { success: true, data: data.data };
            }
            return data;
        } catch (error) {
            console.error('Error fetching contact info:', error);
            return { success: false, data: [] };
        }
    },

    /**
     * Send a contact message
     * @param {Object} messageData - The message data
     * @param {string} messageData.name - Sender's name
     * @param {string} messageData.email - Sender's email
     * @param {string} messageData.subject - Message subject
     * @param {string} messageData.message - Message content
     * @returns {Promise<Object>} - Response with success status
     */
    sendContactMessage: async function(messageData) {
        try {
            const response = await fetch(`${API_BASE_URL}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error sending message:', error);
            return { success: false };
        }
    }
};

