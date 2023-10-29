"use client"
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Order } from '@prisma/client';

interface OrderContextType {
  userOrders: Order[];
  fetchAllOrders: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [userOrders, setUserOrders] = useState<Order[]>([]);

  // Cambia la función fetchAllOrders a loadOrders
  async function loadOrders() {
    try {
      const res = await fetch("/api/order");
      if (res.ok) {
        const data = await res.json();
        setUserOrders(data);
      } else {
        // Maneja errores de la petición fetch aquí
        console.error('Error fetching orders');
      }
    } catch (error) {
      // Maneja errores de la función asíncrona aquí
      console.error('An error occurred while fetching orders', error);
    }
  }

  // Llama a la función loadOrders en el useEffect para cargar los pedidos al montar el componente
  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <OrderContext.Provider value={{ userOrders, fetchAllOrders: loadOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
