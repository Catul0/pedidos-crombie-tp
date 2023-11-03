"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definir el tipo de una orden
type Order = {
  id: number;
  sellerId: number;
  products: string;
  status: string;
  userId: number;
};

// Definir el tipo del contexto
type OrderContextType = {
  userOrders: Order[];
  isLoading: boolean;
  handleAcceptOrder: (orderId: number, products: string, sellerId: number, userId: number) => void;
  handleRejectOrder: (orderId: number, products: string, sellerId: number, userId: number) => void;
  handlePrepareOrder: (orderId: number, products: string, sellerId: number, userId: number) => void;
  handleCookOrder: (orderId: number, products: string, sellerId: number, userId: number) => void;
  handleFinishOrder: (orderId: number, products: string, sellerId: number, userId: number) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function useOrderContext() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
}

type OrderProviderProps = {
  children: ReactNode;
};

export function OrderProvider({ children }: OrderProviderProps) {
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer]=useState(0);
  useEffect(() => {
    // Mover aquí tu solicitud inicial para obtener órdenes

    fetch('/api/order')
      .then((response) => response.json())
      .then((data: Order[]) => {
        // Actualiza el estado de userOrders
        setUserOrders(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener órdenes:', error);
      });
      setTimeout(()=>{
        setTimer(timer+1)
      },10000)
  }, [timer]);

  const handleAcceptOrder = (orderId: number, products: string, sellerId: number, userId: number) => {
      const updatedData = {
          status: 'ACEPTADO',
          products: products,
          sellerId: sellerId,
          userId: userId,
        };
      fetch(`/api/order/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => response.json())
        .then((updatedOrder: Order) => {
          setUserOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.id === updatedOrder.id ? updatedOrder : order
            )
          );
        })
        .catch((error) => {
          console.error('Error al rechazar el pedido:', error);
        });
  };

  const handleRejectOrder = (orderId: number, products: string, sellerId: number, userId: number) => {
    const updatedData = {
      status: 'RECHAZADO',
      products: products,
      sellerId: sellerId,
      userId: userId,
    };
  fetch(`/api/order/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => response.json())
    .then((updatedOrder: Order) => {
      // Actualizar el estado local con el pedido actualizado
      setUserOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
    })
    .catch((error) => {
      console.error('Error al rechazar el pedido:', error);
    });
  };
  const handlePrepareOrder = (orderId: number, products: string, sellerId: number, userId: number) => {
    const updatedData = {
      status: 'PREPARANDO',
      products: products,
      sellerId: sellerId,
      userId: userId,
    };
  fetch(`/api/order/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => response.json())
    .then((updatedOrder: Order) => {
      // Actualizar el estado local con el pedido actualizado
      setUserOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
    })
    .catch((error) => {
      console.error('Error al preparar el pedido:', error);
    });
  };
  const handleCookOrder = (orderId: number, products: string, sellerId: number, userId: number) => {
    const updatedData = {
      status: 'COCINADO',
      products: products,
      sellerId: sellerId,
      userId: userId,
    };
  fetch(`/api/order/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => response.json())
    .then((updatedOrder: Order) => {
      // Actualizar el estado local con el pedido actualizado
      setUserOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
    })
    .catch((error) => {
      console.error('Error al preparar el pedido:', error);
    });
  };
  const handleFinishOrder = (orderId: number, products: string, sellerId: number, userId: number) => {
    const updatedData = {
      status: 'EN_CAMINO',
      products: products,
      sellerId: sellerId,
      userId: userId,
    };
  fetch(`/api/order/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => response.json())
    .then((updatedOrder: Order) => {
      // Actualizar el estado local con el pedido actualizado
      setUserOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
    })
    .catch((error) => {
      console.error('Error al preparar el pedido:', error);
    });
  };
  return (
    <OrderContext.Provider value={{ userOrders, isLoading, handleAcceptOrder, handleRejectOrder, handlePrepareOrder, handleCookOrder, handleFinishOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
