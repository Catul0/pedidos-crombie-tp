"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Order = {
	id: number;
	sellerId: number;
	products: string;
	status: string;
	userId: number;
	deliveryId: number;
	orderDate: string;
};

type OrderContextType = {
	userOrders: Order[];
	localOrders: Order[];
	deliveryOrder: Order[];
	oneUserOrders: Order[];
	ordersInWait: Order[];
	isLoading: boolean;
	loadOrders: (id: number) => Promise<void>;
	loadOrdersInWait: () => Promise<void>;
	loadOrdersUser: (id: number) => Promise<void>;
	loadOrderDelivery: (id: number) => Promise<void>;
	handleAcceptOrder: (orderId: number, products: string, sellerId: number, userId: number) => void;
	handleRejectOrder: (orderId: number, products: string, sellerId: number, userId: number) => void;
	handlePrepareOrder: (orderId: number, products: string, sellerId: number, userId: number) => void;
	handleCookOrder: (orderId: number, products: string, sellerId: number, userId: number) => void;
	handleDeliveryTakingOrder: (
		orderId: number,
		products: string,
		sellerId: number,
		userId: number,
		deliveryId: number
	) => void;
	handleDeliveredOrder: (
		orderId: number,
		products: string,
		sellerId: number,
		userId: number,
		deliveryId: number
	) => void;
	handleScored: (orderId: number, products: string, sellerId: number, userId: number) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function useOrderContext() {
	const context = useContext(OrderContext);
	if (!context) {
		throw new Error("useOrderContext must be used within an OrderProvider");
	}
	return context;
}

type OrderProviderProps = {
	children: ReactNode;
};

export function OrderProvider({ children }: OrderProviderProps) {
	const [userOrders, setUserOrders] = useState<Order[]>([]);
	const [oneUserOrders, setOneUserOrders] = useState<Order[]>([]);
	const [localOrders, setLocalOrders] = useState<Order[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [timer, setTimer] = useState(0);
	const [ordersInWait, setOrdersInWait] = useState<Order[]>([]);
	const [deliveryOrder, setDeliveryOrder] = useState<Order[]>([]);
	//aca se esta haciendo un fetch a order cada 10 segundos asi el local puede ver las ordenes nuevas que le lleguen en tiempo real
	useEffect(() => {
		fetch("/api/order")
			.then((response) => response.json())
			.then((data: Order[]) => {
				setUserOrders(data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error al obtener órdenes:", error);
			});
		setTimeout(() => {
			setTimer(timer + 1);
		}, 5000);
	}, [timer]);

	//esto carga todas las ordenes de un local
	async function loadOrders(id: number) {
		try {
			const res = await fetch("/api/ordersLocal/" + id);
			const data = await res.json();
			setLocalOrders(data);
		} catch (error) {
			console.log(error);
		}
		setTimeout(() => loadOrders(id), 5000);
	}
	// esto carga las ordenes disponibles para que el delivery las tome
	async function loadOrdersInWait() {
		try {
			const res = await fetch("/api/ordersInWait/");
			const data = await res.json();
			setOrdersInWait(data);
		} catch (error) {
			console.log(error);
		}
		setTimeout(() => loadOrdersInWait(), 5000);
	}
	// esto carga la orden del delivery por el id del delivery
	async function loadOrderDelivery(id: number) {
		try {
			const res = await fetch("/api/orderDelivery/" + id);
			const data = await res.json();
			setDeliveryOrder(data);
		} catch (error) {
			console.log(error);
		}
		setTimeout(() => loadOrderDelivery(id), 5000);
	}
	//esto carga las ordenes de un usuario
	async function loadOrdersUser(id: number) {
		try {
			const res = await fetch("/api/ordersUser/" + id);
			const data = await res.json();
			setOneUserOrders(data);
		} catch (error) {
			console.log(error);
		}
	}
  //estos son los handle para manejar el estado de la orden (cuando el local y el delivery cambian su estado)
	const handleAcceptOrder = (
		orderId: number,
		products: string,
		sellerId: number,
		userId: number
	) => {
		const updatedData = {
			status: "ACEPTADO",
			products: products,
			sellerId: sellerId,
			userId: userId,
		};
		fetch(`/api/order/${orderId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedData),
		})
			.then((response) => response.json())
			.then((updatedOrder: Order) => {
				setUserOrders((prevOrders) =>
					prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
				);
			})
			.catch((error) => {
				console.error("Error al rechazar el pedido:", error);
			});
	};
	const handleRejectOrder = (
		orderId: number,
		products: string,
		sellerId: number,
		userId: number
	) => {
		const updatedData = {
			status: "RECHAZADO",
			products: products,
			sellerId: sellerId,
			userId: userId,
		};
		fetch(`/api/order/${orderId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedData),
		})
			.then((response) => response.json())
			.then((updatedOrder: Order) => {
				// Actualizar el estado local con el pedido actualizado
				setUserOrders((prevOrders) =>
					prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
				);
			})
			.catch((error) => {
				console.error("Error al rechazar el pedido:", error);
			});
	};
	const handlePrepareOrder = (
		orderId: number,
		products: string,
		sellerId: number,
		userId: number
	) => {
		const updatedData = {
			status: "PREPARANDO",
			products: products,
			sellerId: sellerId,
			userId: userId,
		};
		fetch(`/api/order/${orderId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedData),
		})
			.then((response) => response.json())
			.then((updatedOrder: Order) => {
				// Actualizar el estado local con el pedido actualizado
				setUserOrders((prevOrders) =>
					prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
				);
			})
			.catch((error) => {
				console.error("Error al preparar el pedido:", error);
			});
	};
	const handleCookOrder = (orderId: number, products: string, sellerId: number, userId: number) => {
		const updatedData = {
			status: "COCINADO",
			products: products,
			sellerId: sellerId,
			userId: userId,
		};
		fetch(`/api/order/${orderId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedData),
		})
			.then((response) => response.json())
			.then((updatedOrder: Order) => {
				// Actualizar el estado local con el pedido actualizado
				setUserOrders((prevOrders) =>
					prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
				);
			})
			.catch((error) => {
				console.error("Error al preparar el pedido:", error);
			});
	};
	const handleDeliveryTakingOrder = (
		orderId: number,
		products: string,
		sellerId: number,
		userId: number,
		deliveryId: number
	) => {
		const updatedData = {
			status: "EN_CAMINO",
			products: products,
			sellerId: sellerId,
			userId: userId,
			deliveryId: deliveryId,
		};
		fetch(`/api/order/${orderId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedData),
		})
			.then((response) => response.json())
			.then((updatedOrder: Order) => {
				// Actualizar el estado local con el pedido actualizado
				setUserOrders((prevOrders) =>
					prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
				);
			})
			.catch((error) => {
				console.error("Error al preparar el pedido:", error);
			});
	};
	const handleDeliveredOrder = (
		orderId: number,
		products: string,
		sellerId: number,
		userId: number,
		deliveryId: number
	) => {
		const updatedData = {
			status: "RECIBIDO",
			products: products,
			sellerId: sellerId,
			userId: userId,
			deliveryId: deliveryId,
		};
		fetch(`/api/order/${orderId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedData),
		})
			.then((response) => response.json())
			.then((updatedOrder: Order) => {
				// Actualizar el estado local con el pedido actualizado
				setUserOrders((prevOrders) =>
					prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
				);
			})
			.catch((error) => {
				console.error("Error al preparar el pedido:", error);
			});
	};
	const handleScored = (orderId: number, products: string, sellerId: number, userId: number) => {
		const updatedData = {
			status: "FINALIZADO",
			products: products,
			sellerId: sellerId,
			userId: userId,
		};
		fetch(`/api/order/${orderId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedData),
		})
			.then((response) => response.json())
			.then((updatedOrder: Order) => {
				setUserOrders((prevOrders) =>
					prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
				);
			})
			.catch((error) => {
				console.error("Error al rechazar el pedido:", error);
			});
	};

	return (
		<OrderContext.Provider
			value={{
				deliveryOrder,
				loadOrderDelivery,
				loadOrdersUser,
				ordersInWait,
				oneUserOrders,
				loadOrders,
				localOrders,
				handleScored,
				handleDeliveredOrder,
				userOrders,
				loadOrdersInWait,
				isLoading,
				handleAcceptOrder,
				handleRejectOrder,
				handlePrepareOrder,
				handleCookOrder,
				handleDeliveryTakingOrder,
			}}>
			{children}
		</OrderContext.Provider>
	);
}
