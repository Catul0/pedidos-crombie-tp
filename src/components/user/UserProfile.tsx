"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useUsers } from "@/context/UserContext";
import EditUser from "./EditUser";
import { useLogin } from "@/context/LoginContext";
import { useRouter } from "next/navigation";
import Popup from "../PopUp";
import Link from "next/link";
import { IconShoppingBag, IconPhone, IconHome2 } from "@tabler/icons-react";
import { useOrderContext } from "@/context/OrderContext";
import ProductsUser from "../product/ProductsUser";
import RatingComponent from "../Rating";

const UserProfile = ({ params }: { params: { id: string } }) => {
	const [showPopup, setShowPopup] = useState(true);
	const { oneUserOrders, loadOrdersUser } = useOrderContext();
	const id = params.id;
	const userOrdersFiltered = oneUserOrders;
	const { logout } = useLogin();
	const { userProfiles, loaduserProfile, setSelectedUser, selectedUser } = useUsers();
	const user: any = userProfiles;
	const router = useRouter();

	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowPopup(false);
		}, 5000); // Oculta el popup después de 5 segundos
		return () => {
			clearTimeout(timeout);
		};
	}, []);

	useEffect(() => {
		if (user && user.id !== Number(id)) {
			loaduserProfile(Number(id));
			loadOrdersUser(Number(id));
		}
	}, [id, user, loaduserProfile]);

	return (
		<div>
			<div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
				{showPopup && <Popup message={`¡Hola ${user.name}!`} />}
				{/* lado izq */}
				<div className="w-full md:w-1/3 bg-[#F3F4F6] p-6">
					<div className="bg-white rounded p-5  shadow-lg">
						<div className="text-center">
							<img
								className="w-16 h-16 rounded-full border-2 border-green-500 mx-auto"
								src={"https://th.bing.com/th/id/OIG.qEapJt_1k2dhaziETMJI?pid=ImgGn"}
								alt="User Profile"
							/>
							<h2 className="text-2xl font-semibold text-gray-800">
								{user.name} {user.lastName}
							</h2>
							<p className="text-gray-600">{user.email}</p>
						</div>
						<div className="mt-6 flex flex-col justify-center gap-5">
							<div className="flex flex-row gap-3">
								<IconPhone />
								<h4>{user.phone}</h4>
							</div>
							<div className="flex flex-row gap-3">
								<IconHome2 />
								<h4>{user.address}</h4>
							</div>
						</div>
						<div className="mt-6">
							<button
								className="bg-[#FF9B50] hover:bg-orange-500 text-white py-2 px-4 w-full font-bold rounded-lg transition ease-in-out delay-150 hover:-translate-x hover:scale-105 duration-300"
								onClick={() => {
									if (selectedUser) {
										setSelectedUser(null);
									} else {
										setSelectedUser(user);
									}
								}}>
								{selectedUser ? "CANCELAR" : "EDITAR PERFIL"}
							</button>
							{selectedUser ? <EditUser /> : <p></p>}
							<button
								className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 w-full mt-4 font-bold rounded-lg transition ease-in-out delay-150 hover:-translate-x hover:scale-105 duration-300"
								onClick={() => {
									setTimeout(() => {
										logout();
										router.push("/login");
									}, 1000);
								}}>
								CERRAR SESIÓN
								{/* esto todavia no anda */}
							</button>
						</div>
					</div>
				</div>

				{/* lado derecho, pedidos */}
				<div className="w-full md:w-2/3 p-8 flex flex-col items-center bg-white shadow-lg">
					<h3 className="text-2xl font-semibold text-gray-800">Tus pedidos</h3>
					<Link href={"/search"}>
						<button className="bg-green-400 hover:bg-green-600 text-white py-2 px-4 mt-4 font-bold rounded-lg transition ease-in-out delay-150 hover:-translate-x hover:scale-105 duration-300">
							Nuevo pedido
						</button>
					</Link>
					{userOrdersFiltered.length > 0 ? (
						<ul className="mt-4 w-2/4 ">
							{[...userOrdersFiltered].reverse().map((order) => (
								<li key={order.id} className="mb-4 border border-gray-200 rounded-lg p-4">
									<ProductsUser productsOrder={order.products} idSeller={order.sellerId} />
									<h4>
										{new Date(order.orderDate).toLocaleDateString("es-AR", {
											day: "2-digit",
											month: "2-digit",
											year: "numeric",
										})}{" "}
										-{" "}
										{new Date(order.orderDate).toLocaleTimeString("es-AR", {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</h4>
									{order.status === "PENDIENTE" && (
										<div>
											<h4 className="text-lg font-semibold">Pedido pendiente</h4>
										</div>
									)}
									{order.status === "RECHAZADO" && (
										<div>
											<h4 className="text-lg font-semibold text-red-500">
												El local rechazó tu pedido
											</h4>
										</div>
									)}
									{order.status === "ACEPTADO" && (
										<div>
											<h4 className="text-lg font-semibold">El local esta preparando tu pedido</h4>
										</div>
									)}
									{order.status === "PREPARANDO" && (
										<div>
											<h4 className="text-lg font-semibold">El local esta preparando tu pedido</h4>
										</div>
									)}
									{order.status === "COCINADO" && (
										<div>
											<h4 className="text-lg font-semibold">Esperando al repartidor</h4>
										</div>
									)}
									{order.status === "FINALIZADO" && (
										<div>
											<h4 className="text-lg font-semibold text-green-500">Entregado</h4>
										</div>
									)}
									{order.status === "EN_CAMINO" && (
										<div>
											<h4 className="text-lg font-semibold">En camino. A cargo del repartidor.</h4>
										</div>
									)}
									{order.status === "ENTREGADO" && (
										<div>
											<h4 className="text-lg font-semibold text-green-500">Entregado</h4>
										</div>
									)}
									{order.status === "RECIBIDO" ? (
										<div>
											<h1>
												<b>Entregado</b>
											</h1>
											<h1>Puntúanos!</h1>
											<RatingComponent
												idseller={order.sellerId}
												iduser={Number(id)}
												iddelivery={order.deliveryId}
												orderId={order.id}
												products={order.products}
											/>
										</div>
									) : (
										<h1></h1>
									)}
								</li>
							))}
						</ul>
					) : (
						<div className="flex flex-col items-center">
							<IconShoppingBag size={100} />
							<p className="text-l font-bold text-black mt-4">Aún no has realizado pedidos</p>
							<p className="text-s text-black">
								Busca entre todas nuestras opciones y disfruta de tu primer pedido
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
