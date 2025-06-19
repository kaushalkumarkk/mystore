import React, { createContext, useState, useEffect } from 'react';
import type { CartItem, Product } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev =>
      prev.find(item => item.id === product.id)
        ? prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...prev, { ...product, quantity: 1 }]
    );
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
