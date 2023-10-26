"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Product = {
  id: number;
  productName: string;
  description: string;
  price: number;
  image: string;
  sellerId: number;
  count?: number;
};

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  total: number;
  removeFromCart: (product: Product) => void;
  removeAllFromCart: (product: Product) => void;
  resetCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);

  // Recupera el carrito y el total del localStorage al cargar la página
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedTotal = localStorage.getItem('total');

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedTotal) {
      setTotal(parseFloat(savedTotal));
    }
  }, []);

  // Guarda el carrito y el total en el localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', total.toString());
  }, [cart, total]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    setTotal(total + product.price);
  };

  const removeFromCart = (product: Product) => {
    const index = cart.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      const updatedCart = [...cart];
      const removedProduct = updatedCart[index];

      if (removedProduct.count && removedProduct.count > 1) {
        removedProduct.count--; // dcrementa la cantidad del producto si es mayor que 1
      } else {
        updatedCart.splice(index, 1); // elimina el producto del carrito si la cantidad es 1
      }

      const updatedTotal = total - removedProduct.price;

      setCart(updatedCart);
      setTotal(updatedTotal);
    }
  };

  const removeAllFromCart = (product: Product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    const updatedTotal = total - product.price * (product.count || 1); // resta el precio del producto eliminado

    setCart(updatedCart);
    setTotal(updatedTotal);
  };

  const resetCart = () => {
    setCart([]);
    setTotal(0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, total, removeFromCart, removeAllFromCart, resetCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
