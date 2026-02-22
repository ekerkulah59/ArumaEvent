import storageService, { STORAGE_KEYS } from './storageService';

/**
 * Cart item shape: { type: 'rental' | 'service', id, name, quantity, image? }
 * Used for quote requests; persisted in localStorage (no backend cart API).
 */

const CART_KEY = STORAGE_KEYS.CART;

const cartService = {
    /**
     * Get current cart items
     * @returns {Array<{ type: string, id: string, name: string, quantity: number, image?: string }>}
     */
    getCart: () => {
        const raw = storageService.getFromLocalStorage(CART_KEY, []);
        if (!Array.isArray(raw)) return [];
        return raw.filter(
            (item) =>
                item &&
                typeof item.type === 'string' &&
                typeof item.id === 'string' &&
                typeof item.name === 'string' &&
                Number.isInteger(item.quantity) &&
                item.quantity >= 1
        );
    },

    /**
     * Add or merge item into cart (same type+id increments quantity)
     * @param {{ type: 'rental' | 'service', id: string, name: string, quantity?: number, image?: string }} item
     * @returns {Array} Updated cart
     */
    addItem: (item) => {
        const cart = cartService.getCart();
        const qty = Math.max(1, Number(item.quantity) || 1);
        const existingIndex = cart.findIndex((c) => c.type === item.type && c.id === item.id);
        if (existingIndex >= 0) {
            cart[existingIndex].quantity += qty;
        } else {
            cart.push({
                type: item.type,
                id: item.id,
                name: item.name,
                quantity: qty,
                image: item.image ?? null,
            });
        }
        storageService.saveToLocalStorage(CART_KEY, cart);
        return cart;
    },

    /**
     * Update quantity for a line item (remove if quantity < 1)
     * @param {string} type - 'rental' | 'service'
     * @param {string} id - Item id
     * @param {number} quantity - New quantity
     * @returns {Array} Updated cart
     */
    updateQuantity: (type, id, quantity) => {
        let cart = cartService.getCart();
        const num = Math.max(0, Number(quantity) | 0);
        if (num < 1) {
            cart = cart.filter((c) => !(c.type === type && c.id === id));
        } else {
            const idx = cart.findIndex((c) => c.type === type && c.id === id);
            if (idx >= 0) cart[idx].quantity = num;
        }
        storageService.saveToLocalStorage(CART_KEY, cart);
        return cart;
    },

    /**
     * Remove one line item
     * @param {string} type - 'rental' | 'service'
     * @param {string} id - Item id
     * @returns {Array} Updated cart
     */
    removeItem: (type, id) => {
        const cart = cartService.getCart().filter((c) => !(c.type === type && c.id === id));
        storageService.saveToLocalStorage(CART_KEY, cart);
        return cart;
    },

    /**
     * Clear all cart items
     * @returns {Array} Empty cart
     */
    clearCart: () => {
        storageService.saveToLocalStorage(CART_KEY, []);
        return [];
    },

    /**
     * Total number of line items (sum of quantities)
     * @returns {number}
     */
    getCount: () => {
        return cartService.getCart().reduce((sum, item) => sum + item.quantity, 0);
    },

    /**
     * Format cart items for quote payload: [{ id, name, quantity }, ...]
     * @returns {Array<{ id: string, name: string, quantity: number }>}
     */
    getItemsForQuote: () => {
        return cartService.getCart().map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
        }));
    },
};

export default cartService;
