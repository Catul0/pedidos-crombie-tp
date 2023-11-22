"use client";
import { useVehicles } from "@/context/VehicleContext";
import { TIMEOUT } from "dns";
import { useEffect, useState } from "react";
import { setTimeout } from "timers";

export default function CreateVehicle({ params }: { params: { id: string } }) {
	const [brand, setBrand] = useState("");
	const [model, setModel] = useState("");
	const [licensePlate, setLicensePlate] = useState("");
	const [color, setColor] = useState("");
	const [carYear, setYear] = useState("");

	const { createVehicle, vehicles, deleteVehicle, loadSellerVehicles } = useVehicles();

	return (
		<div className="px-[100px]">
			<form
				className="bg-white px-6 py-6 rounded-md shadow-md mt-6"
				onSubmit={async (e) => {
					e.preventDefault();
					const year = Number(carYear);
					await deleteVehicle(Number(params.id));
					setTimeout(() => {
						createVehicle(
							{
								id: 0,
								brand,
								model,
								year,
								color,
								licensePlate,
								vehicleOwner: 0,
							},
							Number(params.id)
						);
					}, 1000);
				}}>
				<div className="relative z-0 w-full mb-6 group">
					<input
						type="text"
						name="brand"
						id="brand"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						onChange={(e) => setBrand(e.target.value)}
						placeholder=""
						required
					/>
					<label
						htmlFor="vehicleName"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						Marca de vehiculo
					</label>
				</div>
				<div className="relative z-0 w-full mb-6 group">
					<input
						type="text"
						name="model"
						id="model"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						onChange={(e) => setModel(e.target.value)}
						placeholder=" "
						required
					/>
					<label
						htmlFor="price"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						Modelo
					</label>
				</div>
				<div className="relative z-0 w-full mb-6 group">
					<input
						type="text"
						name="carYear"
						id="carYear"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						onChange={(e) => setYear(e.target.value)}
						placeholder=" "
					/>
					<label
						htmlFor="image"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						Año
					</label>
				</div>
				<div className="relative z-0 w-full mb-6 group">
					<input
						type="text"
						name="color"
						id="color"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						onChange={(e) => setColor(e.target.value)}
						placeholder=" "
						required
					/>
					<label
						htmlFor="description"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						Color
					</label>
				</div>
				<div className="relative z-0 w-full mb-6 group">
					<input
						type="text"
						name="licensePlate"
						id="licensePlate"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						onChange={(e) => setLicensePlate(e.target.value)}
						placeholder=" "
						required
					/>
					<label
						htmlFor="description"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						Patente
					</label>
				</div>
				<div className="flex justify-between">
					<button
						type="submit"
						className="text-white bg-green-700 text-bold hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-300 ease-in-out transform hover:scale-105">
						Agregar
					</button>
				</div>
			</form>
		</div>
	);
}
