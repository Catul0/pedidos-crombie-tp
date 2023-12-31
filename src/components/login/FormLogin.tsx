"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useLogin } from "@/context/LoginContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { decode } from "jsonwebtoken";

function FormLogin() {
	const [error, setError] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userType, setUserType] = useState("user");
	const router = useRouter();
	const { login } = useLogin();
	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};
	function goRegister() {
		if (userType == "user") {
			router.push("/users/register");
		} else if (userType == "seller") {
			router.push("/sellers/register");
		} else if (userType == "delivery") {
			router.push("/deliverys/register");
		}
	}
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await login({
				email,
				password,
				userType,
			});
			// aca tengo que obtener el id del usuario mediante su cookie
			const token: any = Cookies.get("token");
			if (token)
				if (userType === "user") {
					router.push("/search");
				} else {
					router.push(`/${userType}s/${(decode(token) as { id: string })?.id}`);
				}
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			}
		}
	};

	return (
		<div className="bg-white p-10 rounded shadow-lg h-min mt-20">
			<h2 className="text-2xl font-semibold mb-4">Iniciar sesión</h2>
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700 py-2">Tipo de usuario:</label>
				<div className="flex space-x-2 pb-3">
					<button
						className={`flex-1 py-1 px-2 rounded-md ${
							userType === "user" ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
						} transition duration-300 transform hover:scale-105`}
						onClick={() => setUserType("user")}>
						Usuario
					</button>
					<button
						className={`flex-1 py-1 px-2 rounded-md ${
							userType === "delivery" ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
						} transition duration-300 transform hover:scale-105`}
						onClick={() => setUserType("delivery")}>
						Delivery
					</button>
					<button
						className={`flex-1 py-1 px-2 rounded-md ${
							userType === "seller" ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
						} transition duration-300 transform hover:scale-105`}
						onClick={() => setUserType("seller")}>
						Local
					</button>
				</div>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="relative z-0 w-full mb-8 group">
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={handleEmailChange}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
						required
						placeholder=""
					/>
					<label
						htmlFor="email"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						Correo electrónico:
					</label>
				</div>
				<div className="relative z-0 w-full mb-8 group">
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={handlePasswordChange}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-fuchsia-600 focus:outline-none focus:ring-0 focus:border-black peer"
						required
						placeholder=""
					/>
					<label
						htmlFor="password"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-fuchsia-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						Contraseña:
					</label>
				</div>
				{error && <div className="text-red-600 mb-2">{error}</div>}

				<button
					type="submit"
					className="bg-green-500 hover:bg-green-600 text-white w-full font-bold py-2 px-4 rounded transform transition duration-300 hover:scale-105">
					Iniciar sesión
				</button>
				<p className="text-sm py-2">
					Todavía no tienes una cuenta?{" "}
					<span
						onClick={() => {
							goRegister();
						}}
						className="text-green-500 hover:text-black cursor-pointer text-sm">
						Registrate aquí
					</span>
				</p>
			</form>
		</div>
	);
}

export default FormLogin;
