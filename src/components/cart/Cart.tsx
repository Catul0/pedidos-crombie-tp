import React from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/interfaces/Product";
import Link from "next/link";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
function Cart() {
	const { cart, total, addToCart, removeFromCart, removeAllFromCart, resetCart } = useCart();

	const productCount: { [key: number]: Product & { count: number } } = {};

	cart.forEach((item) => {
		if (!productCount[item.id]) {
			productCount[item.id] = { ...item, count: 0 };
		}
		productCount[item.id].count++;
	});

	const uniqueCart = Object.values(productCount);

	const handleRemoveAll = (item: any) => {
		const confirmed = window.confirm(
			"¿Estás seguro de que deseas eliminar todos los productos de este tipo del carrito?"
		);

		if (confirmed) {
			removeAllFromCart(item);
		}
	};

	const handleResetCart = () => {
		const confirmed = window.confirm(
			"¿Estás seguro de que deseas eliminar todos los productos del carrito?"
		);

		if (confirmed) {
			resetCart();
		}
	};

	return (
		<div className="text-center bg-gray-100 p-4 rounded-lg">
			<h2 className="text-gray-800 text-2xl font-bold mb-4">
				<b>Carrito de Compras</b>
			</h2>
			{uniqueCart.length === 0 ? (
				<p>Tu carrito está vacío :(</p>
			) : (
				<div>
					<ul className="list-none p-0">
						{uniqueCart.map((item) => (
							<li key={item.id} className="mb-2 p-4 bg-white rounded-md flex justify-between">
								<div className="font-bold">{item.productName}</div>
								<div className="flex gap-3">
									{item.count > 1 && (
										<button onClick={() => removeFromCart(item)}>
											<IconMinus style={{ fontSize: "1.5rem" }} />
										</button>
									)}
									<p className="font-bold">{item.count}</p>
									<button onClick={() => addToCart(item)}>
										<IconPlus style={{ fontSize: "1.5rem" }} />
									</button>
									<p className="font-bold">${item.price * item.count}</p>
									<button onClick={() => handleRemoveAll(item)}>
										<IconTrash style={{ fontSize: "1.5rem" }} />
									</button>
								</div>
							</li>
						))}
					</ul>
					<p className="font-bold mt-5">Subtotal: ${total}</p>
					<button
						onClick={() => handleResetCart()}
						className="font-bold bg-red-500 rounded p-2 text-white mt-5 mb-5 transform hover:scale-110 transition-transform duration-300 ease-in-out">
						Vaciar carrito
					</button>
					<br />
					<Link href={"/checkout"}>
						<button className="font-bold bg-green-700 rounded text-white p-2 transform hover:scale-110 transition-transform duration-300 ease-in-out">
							Confirmar Compra
						</button>
					</Link>
				</div>
			)}
		</div>
	);
}

export default Cart;
