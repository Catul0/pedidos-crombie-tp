"use client";
import { useState, useEffect } from "react";
import { useLocalProfiles } from "@/context/LocalProfileContext";
import uploadFile from "@/libs/update-file";

function EditSeller() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [logo, setLogo] = useState("");

	const { updateLocalProfile, selectedSeller, setSelectedSeller } = useLocalProfiles();

	useEffect(() => {
		setName(selectedSeller?.name || "");
		setAddress(selectedSeller?.address || "");
		setCity(selectedSeller?.city || "");
		setLogo(selectedSeller?.logo || "");
		setDescription(selectedSeller?.description || "");
	}, [selectedSeller]);
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				let id = 1;
				if (selectedSeller?.id) {
					id = selectedSeller.id;
				}

				await updateLocalProfile(id, {
					name,
					description,
					address,
					city,
					logo,
				});
				setSelectedSeller(null);
			}}
			className="max-w-md mx-auto p-4 bg-white rounded shadow ">
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
				<input
					type="text"
					name="name"
					value={name}
					className="w-full border border-gray-300 rounded p-2"
					onChange={(e) => setName(e.target.value)}
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
				<label className="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
				<textarea
					name="description"
					value={description}
					className="w-full border border-gray-300 rounded p-2"
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2">Logo:</label>
				<input
					type="file"
					name="logo"
					id="logo"
					accept="image/*"
					className="w-full border border-gray-300 rounded p-2 mb-3"
					onChange={async (e) => {
						if (e.target.files) {
							const result = await uploadFile(e.target.files[0]);
							setLogo(
								"https://guls-escuelita-api-mainst-escuelitabucketc7b4e42a-1e9sgj383k6ak.s3.amazonaws.com/" +
									result
							);
						}
					}}
				/>
				{logo ? <img src={logo} className="h-[100px] m-auto" alt="Imagen del producto" /> : <p></p>}
			</div>
			<button className="col-span-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
				Guardar
			</button>
		</form>
	);
}

export default EditSeller;
