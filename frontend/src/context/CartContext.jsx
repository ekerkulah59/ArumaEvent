import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import cartService from '../services/cartService';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const refresh = useCallback(() => {
    setItems(cartService.getCart());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addItem = useCallback((item) => {
    const next = cartService.addItem(item);
    setItems(next);
    return next;
  }, []);

  const removeItem = useCallback((type, id) => {
    const next = cartService.removeItem(type, id);
    setItems(next);
    return next;
  }, []);

  const updateQuantity = useCallback((type, id, quantity) => {
    const next = cartService.updateQuantity(type, id, quantity);
    setItems(next);
    return next;
  }, []);

  const clearCart = useCallback(() => {
    const next = cartService.clearCart();
    setItems(next);
    return next;
  }, []);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  const value = {
    items,
    count,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    refresh,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
