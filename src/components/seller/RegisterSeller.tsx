"use client";
import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import { useLocalProfiles } from "@/context/LocalProfileContext";
import Cookies from "js-cookie";
import { decode } from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { HStack, Input } from "@chakra-ui/react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import * as yup from "yup";
import { cities } from "@/app/data/cities";
require("dotenv").config();

function RegisterSeller() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [password, setPassword] = useState("");
	const [secondPassword, setSecondPassword] = useState("");
	const [match, setMatch] = useState(true);
	const [alert, setAlert] = useState(false);
	const [email, setEmail] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const { createLocalProfile } = useLocalProfiles();
	const router = useRouter();
	const directionRef = useRef<HTMLInputElement | null>(null);
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY || "",
		libraries: ["places"],
	});

	if (!isLoaded) {
		return <p>Loading...</p>;
	}

	const handleSecondPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSecondPassword(e.target.value);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setMatch(password === secondPassword);
		if (password === secondPassword) {
			setAlert(true);
			await createLocalProfile({
				name,
				description,
				address,
				city,
				email,
				password,
			});
			const token: any = Cookies.get("token");
			if (token) router.push(`/sellers/${(decode(token) as { id: string })?.id}`);
		} else {
			setAlert(false);
		}
	};
	const passwordSchema = yup
		.string()
		.min(8, "La contraseña debe tener al menos 8 caracteres")
		.matches(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
		.matches(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
		.matches(/\d/, "La contraseña debe contener al menos un número")
		.required("La contraseña es requerida");

	return (
		<div
			className="flex absolute md:flex-row top-16 justify-center items-center w-full h-full bg-cover bg-center"
			style={{
				backgroundImage: `url('https://images.unsplash.com/photo-1673212036711-b4b30c62ec11?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
			}}>
			<div className="hidden md:flex md:w-2/5 max-w-xl flex flex-col mr-40">
				<h1 className="font-bold text-white text-5xl">
					¡Registrá tu restaurante en Pedidos Crombie Partners y vende más!
				</h1>
				<p className="text-white mt-5">
					En el Portal Partners de Pedidos Crombie, tendrás acceso a muchas herramientas para
					impulsar tu empresa. Al convertirte en aliado de Pedidos Crombie, tus ventas aumentarán
					hasta un 30% sin incrementar costos operativos y llegando a más usuarios. ¡Crecé con
					Pedidos Crombie!
				</p>
			</div>
			<form onSubmit={handleSubmit} className="max-w-sm p-8 bg-white rounded-lg shadow-lg">
				<h2 className="text-2xl font-semibold mb-4">Registrarse como vendedor</h2>
				<div className="grid md:grid-cols-2 md:gap-6">
					<div className="relative z-0 w-full mb-4 group">
						<input
							type="text"
							name="name"
							className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
							onChange={(e) => setName(e.target.value)}
							placeholder=" "
							required
						/>
						<label
							htmlFor="name"
							className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Nombre del local:
						</label>
					</div>
					<div className="relative z-0 w-full mb-4 group">
						<input
							type="text"
							name="description"
							className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
							onChange={(e) => setDescription(e.target.value)}
							placeholder=" "
							required
						/>
						<label
							htmlFor="description"
							className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Descripción:
						</label>
					</div>
					<HStack className="relative z-0 w-full mb-10 group">
						<Autocomplete>
							<Input
								type="text"
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
								ref={directionRef}
								onBlur={(e) => {
									setAddress(directionRef.current!.value);
								}}
								placeholder=""
								required
							/>
						</Autocomplete>
						<label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Dirección:
						</label>
					</HStack>
					<div className="relative z-0 w-full mb-6 group">
						<select
							name="city"
							className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
							onChange={(e) => setCity(e.target.value)}
							required>
							<option value="">Selecciona una ciudad</option>
							{cities.map((city) => (
								<option key={city} value={city}>
									{city}
								</option>
							))}
						</select>
						<label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Ciudad:
						</label>
					</div>
				</div>
				<div className="relative z-0 w-full mb-10 group">
					<input
						type="email"
						name="email"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
						onChange={(e) => setEmail(e.target.value)}
						placeholder=" "
						required
					/>
					<label
						htmlFor="email"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						Email:
					</label>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="relative z-0 w-full mb-6 group">
						<input
							type="password"
							name="password"
							className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
							onChange={(e) => {
								const password = e.target.value;
								passwordSchema
									.validate(password)
									.then(() => {
										setPassword(password);
										setPasswordError("");
									})
									.catch((error) => {
										setPasswordError(error.message);
									});
							}}
							placeholder=""
							required
						/>
						<label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Contraseña:
						</label>
						{passwordError && <p className="text-red-500">{passwordError}</p>}
					</div>
					<div className="relative z-0 w-full mb-10 group">
						<input
							type="password"
							name="secondPassword"
							className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
							onChange={handleSecondPasswordChange}
							placeholder=" "
							required
						/>
						<label
							htmlFor="secondPassword"
							className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Confirmar contraseña:
						</label>
						{match === false ? (
							<div className="mb-4 span-2">
								<p className="text-red-500">Las contraseñas no coinciden</p>
							</div>
						) : (
							<p></p>
						)}
					</div>
				</div>
				{alert ? (
					<div className="mb-4 span-2">
						<p className="block text-green-400 text-center text-sm font-bold mb-2 rounded">
							Registrado correctamente
						</p>
					</div>
				) : (
					<p></p>
				)}
				<button className="bg-green-500 hover:bg-green-600 text-white w-full font-bold py-2 px-4 rounded transform transition duration-300 hover:scale-105">
					Registrarse
				</button>
			</form>
		</div>
	);
}

export default RegisterSeller;
