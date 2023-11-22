/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { useDeliverys } from "@/context/DeliveryContext";
import CreateVehicle from "@/components/vehicle/createVehicle";
import { useVehicles } from "@/context/VehicleContext";
import { useOrderContext } from "@/context/OrderContext";
import VehicleCard from "./VehicleCard";
import { motion } from "framer-motion";
import { useUsers } from "@/context/UserContext";
import { useLocalProfiles } from "@/context/LocalProfileContext";
import Maps from "../Maps";
import Navbar from "../Navbar";
import { useScores } from "@/context/ScoreContext";
import PuntajeConEstrellas from "../Stars";
import BackButton from "../BackButton";
import { IconUserCircle } from "@tabler/icons-react";
import { IconBike } from "@tabler/icons-react";
import { IconToolsKitchen2 } from "@tabler/icons-react";

export default function DeliveryProfile({ params }: { params: { id: string } }) {
	function getAddresses(order: any) {
		let userAddress = "";
		let sellerAddress = "";

		const user = users.find((user) => user.id === order.userId);

		if (user) {
			userAddress = user.address;
		}

		const seller = localProfiles.find((seller) => seller.id === order.sellerId);

		if (seller) {
			sellerAddress = seller.address;
		}

		return { userAddress, sellerAddress };
	}
	const { userOrders, handleDeliveryTakingOrder, handleDeliveredOrder } = useOrderContext();
	const userOrdersFiltered = userOrders.filter(
		(order: any) =>
			order.deliveryId === null && order.status != "RECHAZADO" && order.status != "PENDIENTE"
	);
	const deliverysOrder = userOrders.filter(
		(order: any) =>
			order.deliveryId === Number(params.id) &&
			order.status != "RECIBIDO" &&
			order.status != "FINALIZADO"
	);

	const { loadLocalProfile, localProfiles } = useLocalProfiles();
	const { deliveryProfile, loadDeliveryProfile } = useDeliverys();
	const { loadSellerVehicles, sellerCar } = useVehicles();
	const [cargarAuto, setCargarAuto] = useState(false);
	const [showMessage, setShowMessage] = useState(false);
	const { loadUsers, users } = useUsers();
	const id = Number(params.id);
	const delivery: any = deliveryProfile;

	const car: any = sellerCar;

	useEffect(() => {
		// Verificar si el contenido de car es "vehicle not found" y mostrar el mensaje
		if (car && car.message === "Vehicle not found") {
			setShowMessage(true);
		} else {
			setShowMessage(false);
		}
	}, [car]);

	const { scores, loadScores } = useScores();
	const [puntaje, setPuntaje] = useState(0);
	useEffect(() => {
		if (scores && scores.length > 0) {
			const deliveryScores = scores.filter((score) => score.deliveryId === Number(id));

			if (deliveryScores.length > 0) {
				const totalScore = deliveryScores.reduce((accumulator, currentScore) => {
					return accumulator + currentScore.score;
				}, 0);
				const averageScore = totalScore / deliveryScores.length;
				const roundedAverageScore = averageScore.toFixed(1);
				console.log(puntaje);
				setPuntaje(Number(roundedAverageScore));
			}
		}
	}, [id, scores]);
	useEffect(() => {
		// Realiza la carga del perfil del vendedor solo si no se ha cargado previamente o si el ID ha cambiado.
		if (!delivery || delivery.id !== Number(id)) {
			loadDeliveryProfile(Number(id));
			loadScores();
		}
	}, [id, delivery, loadScores]);
	useEffect(() => {
		loadLocalProfile();
		loadUsers();
		loadSellerVehicles(Number(id));
	}, [id]);
	const [isInfoOpen, setIsInfoOpen] = useState(false);
	return (
		<>
			<div className="bg-white h-16 flex items-center justify-between px-10 border-b shadow-lg">
				<BackButton />
				<div className="flex items-center space-x-4">
					<div className="flex items-center">
						<div className="flex items-center gap-5">
							<IconUserCircle
								width={50}
								height={50}
								className="cursor-pointer"
								onClick={() => setIsInfoOpen(!isInfoOpen)}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-center items-center gap-8 p-8 flex-col">
				{isInfoOpen && (
					<div className="bg-white rounded-lg shadow-lg p-6">
						<div className="text-center">
							{showMessage && (
								<div className="bg-red-500 text-white p-2 mt-4 text-center rounded">
									Inhabilitado para repartir: <br /> Debes cargar un vehículo.
								</div>
							)}
							<h2 className="text-3xl font-bold text-gray-900">
								{delivery.name} {delivery.lastName}
							</h2>
							<p className="text-gray-700 mb-4">Puntaje Promedio:</p>
							<PuntajeConEstrellas puntaje={puntaje} />
						</div>
						<div className="border-t border-gray-200 mt-6 pt-6">
							<VehicleCard car={car} />
						</div>
						<button
							onClick={() => {
								setCargarAuto(!cargarAuto);
							}}
							className={`${
								cargarAuto
									? "bg-red-500 hover:bg-red-600 transform scale-105"
									: "bg-green-500 hover:bg-green-600 transform scale-105"
							} text-white mt-4 py-2 px-4 rounded-md w-full transition-all duration-500`}>
							{cargarAuto ? "Cancelar" : "Cargar Nuevo Vehiculo"}
						</button>
						{cargarAuto ? (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.5, ease: "easeOut" }}>
								<CreateVehicle params={params} />
							</motion.div>
						) : null}
					</div>
				)}
				{deliverysOrder.length > 0 ? (
					<div className="bg-white rounded-lg shadow-lg p-6">
						<h1 className="text-lg font-bold text-gray-900">Tienes un pedido que entregar:</h1>
						<ul>
							{deliverysOrder.map((order) => (
								<li
									key={order.id}
									className="mb-4 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300">
									{localProfiles.map((seller) =>
										seller.id === order.sellerId ? (
											<div key={seller.id}>
												<h4 className="text-lg font-semibold text-gray-900">{seller.name}</h4>
												<h4 className="text-lg font-semibold text-gray-900">
													Buscar en: {seller.address}
												</h4>
											</div>
										) : (
											<p key={seller.id}></p>
										)
									)}
									{users.map((user) =>
										user.id === order.userId ? (
											<div key={user.id}>
												<h4 className="text-lg font-semibold text-gray-900">{user.name}</h4>
												<h4 className="text-lg font-semibold text-gray-900">
													Entregar en: {user.address}
												</h4>
											</div>
										) : (
											<p key={user.id}></p>
										)
									)}
									<h4 className="text-lg font-semibold text-gray-900">
										Cantidad de productos: {order.products.split(",").length}
									</h4>
									<Maps
										origin={getAddresses(order).sellerAddress}
										destination={getAddresses(order).userAddress}
									/>
									<button
										onClick={() =>
											handleDeliveredOrder(
												order.id,
												order.products,
												order.sellerId,
												order.userId,
												Number(id)
											)
										}
										className="bg-red-500 text-white text-base font-semibold py-2 px-4 rounded-md mt-4 hover:bg-red-600 transition-all duration-300 focus:outline-none">
										Ya entregué el pedido
									</button>
								</li>
							))}
						</ul>
					</div>
				) : (
					<div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-5">
						<h1 className="text-lg font-bold text-gray-900">
							No tienes pedidos asignados. Elige uno:
						</h1>
						{userOrdersFiltered.length > 0 ? (
							<ul>
								{userOrdersFiltered.map((order) => (
									<li
										key={order.id}
										className="mb-4 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300">
										{localProfiles.map((seller) =>
											seller.id === order.sellerId ? (
												<div className="flex gap-2" key={seller.id}>
													<h4 className="text-lg text-gray-900">
														<b>Local:</b> {seller.name} - {seller.address}
													</h4>
												</div>
											) : (
												<p key={seller.id}></p>
											)
										)}
										{users.map((user) =>
											user.id === order.userId ? (
												<div key={user.id}>
													<h4 className="text-lg text-gray-900">
														<b>Cliente:</b> {user.name}
													</h4>
													<h4 className="text-lg text-gray-900">
														<b>Entregar en:</b> {user.address}
													</h4>
												</div>
											) : (
												<p key={user.id}></p>
											)
										)}
										<h4 className="text-lg text-gray-900">
											<b>Cantidad de productos:</b> {order.products.split(",").length}
										</h4>
										{order.status === "COCINADO" && (
											<div>
												<button
													onClick={() =>
														handleDeliveryTakingOrder(
															order.id,
															order.products,
															order.sellerId,
															order.userId,
															Number(id)
														)
													}
													className="bg-red-500 text-white text-base font-semibold py-2 px-4 rounded-md mt-4 hover:bg-red-600 transition-all duration-300 focus:outline-none">
													Tomar pedido
												</button>
											</div>
										)}
									</li>
								))}
							</ul>
						) : (
							<h1 className="text-gray-900">No hay pedidos por entregar en este momento</h1>
						)}
					</div>
				)}
			</div>
		</>
	);
}
