import React from "react";
import PuntajeConEstrellas from "../Stars";
import { motion } from "framer-motion";
import CreateVehicle from "../vehicle/createVehicle";
import VehicleCard from "./VehicleCard";

function cardInfoDelivery({showMessage, delivery, puntaje, car, setCargarAuto, cargarAuto, params}: any) {
	return (
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
	);
}

export default cardInfoDelivery;
