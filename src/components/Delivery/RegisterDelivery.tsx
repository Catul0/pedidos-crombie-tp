"use client";
import { useState } from "react";
import { useDeliverys } from "@/context/DeliveryContext";
import Cookies from "js-cookie";
import { decode } from "jsonwebtoken";
import { useRouter } from "next/navigation";
import * as yup from "yup";

function RegisterDelivery() {
	const { createDelivery } = useDeliverys();
	const router = useRouter();
	const [name, setName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [match, setMatch] = useState(true);
	const [alert, setAlert] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const imagenUrl =
		"https://images.unsplash.com/photo-1610478920409-ec0f58e881a5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

	const passwordSchema = yup
		.string()
		.min(8, "La contraseña debe tener al menos 8 caracteres")
		.matches(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
		.matches(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
		.matches(/\d/, "La contraseña debe contener al menos un número")
		.required("La contraseña es requerida");

	return (
		<div
			className="flex absolute md:flex-row top-16  justify-center gap-10 items-center w-full h-full bg-cover bg-center pr-10 pl-10"
			style={{ backgroundImage: `url(${imagenUrl})` }}>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					setMatch(password === confirmPassword);

					if (password === confirmPassword) {
						setAlert(true);
						await createDelivery({
							name,
							lastName,
							email,
							password,
						});

						const token = Cookies.get("token");
						if (token) {
							setTimeout(() => {
								router.push(`/deliverys/${(decode(token) as { id: string })?.id}`);
							}, 3000);
						}
					} else {
						setAlert(false);
					}
				}}
				className="max-w-sm p-8 bg-white rounded-lg shadow-md ">
				<div className="grid md:grid-cols-2 gap-4">
					<div className="relative z-0 w-full mb-8 group">
						<input
							type="text"
							name="name"
							className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-fuchsia-600 focus:outline-none focus:ring-0 focus:border-black peer"
							onChange={(e) => setName(e.target.value)}
							placeholder=""
							required
						/>
						<label
							form=""
							className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Nombre:
						</label>
					</div>
					<div className="relative z-0 w-full mb-8 group">
						<input
							type="text"
							name="LastName"
							className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
							onChange={(e) => setLastName(e.target.value)}
							placeholder=""
							required
						/>
						<label className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Apellido:
						</label>
					</div>
				</div>
				<div className="relative z-0 w-full mb-8 group">
					<input
						type="email"
						name="email"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
						onChange={(e) => setEmail(e.target.value)}
						placeholder=""
						required
					/>
					<label className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						Email:
					</label>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="relative z-0 w-full mb-6 group">
						<input
							type="password"
							name="password"
							className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-950 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
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
						<label className="peer-focus:font-medium absolute text-sm text-slate-950 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Contraseña:
						</label>
						{passwordError && <p className="text-red-500">{passwordError}</p>}
					</div>
					<div className="relative z-0 w-full mb-8 group">
						<input
							type="password"
							name="confirmPassword"
							className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder=""
							required
						/>
						<label className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
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
			<div className="hidden md:flex md:w-2/6 text-white p-4 flex gap-5 flex-col">
				<h1 className="text-5xl font-bold">¡Únete hoy como repartidor en nuestra plataforma!</h1>
				<p className="text-2xl">Conviértete en un aliado de entrega y sé parte de nuestro éxito.</p>
			</div>
		</div>
	);
}

export default RegisterDelivery;
