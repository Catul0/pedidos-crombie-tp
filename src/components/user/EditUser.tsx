"use client";
import { useState, useEffect } from "react";
import { useUsers } from "@/context/UserContext";

function EditUser() {
	const [name, setName] = useState("");
	const [lastName, setlastName] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [phone, setPhone] = useState("");

	const { updateUser, selectedUser, setSelectedUser } = useUsers();

	useEffect(() => {
		setName(selectedUser?.name || "");
		setlastName(selectedUser?.lastName || "");
		setAddress(selectedUser?.address || "");
		setCity(selectedUser?.city || "");
		setEmail(selectedUser?.email || "");
		setPhone(selectedUser?.phone || "");
	}, [selectedUser]);
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				let id = 1;
				if (selectedUser?.id) {
					id = selectedUser.id;
				}

				await updateUser(id, {
					name,
					lastName,
					address,
					city,
					email,
					phone,
				});
				setSelectedUser(null);
			}}
			className="max-w-md mx-auto p-4 bg-white rounded shadow ">
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
				<input
					type="text"
					name="name"
					value={name}
					className="w-full border border-gray-300 rounded p-2"
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
				<input
					type="text"
					name="name"
					value={lastName}
					className="w-full border border-gray-300 rounded p-2"
					onChange={(e) => setlastName(e.target.value)}
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2">Telefono:</label>
				<input
					type="text"
					name="description"
					value={phone}
					className="w-full border border-gray-300 rounded p-2"
					onChange={(e) => setPhone(e.target.value)}
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2">Ciudad:</label>
				<input
					type="text"
					name="city"
					value={city}
					className="w-full border border-gray-300 rounded p-2"
					onChange={(e) => setCity(e.target.value)}
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2">Dirección:</label>
				<input
					type="text"
					name="address"
					value={address}
					className="w-full border border-gray-300 rounded p-2"
					onChange={(e) => setAddress(e.target.value)}
				/>
			</div>
			<button className="col-span-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition ease-in-out delay-150 hover:-translate-x hover:scale-105 duration-300">
				Guardar
			</button>
		</form>
	);
}

export default EditUser;
