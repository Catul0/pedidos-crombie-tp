"use client";
import { createContext, useContext, useState } from "react";
import { sellerProfile, CreateLocalProfile, UpdateProfile } from "@/interfaces/LocalProfile";
import { LocalProfile } from "@prisma/client";

interface Children {
	children: React.ReactNode;
}

export const LocalProfileContext = createContext<{
	localProfiles: sellerProfile[];
	sellerProfile: sellerProfile[];
	cityLocals: sellerProfile[];
	allProducts: any[];
	loadLocalProfile: () => Promise<void>;
	loadSellerProfile: (id: number) => Promise<void>;
	loadLocalsCity: (id: number) => Promise<void>;
	createLocalProfile: (local: CreateLocalProfile) => Promise<void>;
	updateLocalProfile: (id: number, local: UpdateProfile) => Promise<void>;
	deleteLocalProfile: (id: number) => Promise<void>;
	selectedSeller: LocalProfile | null;
	setSelectedSeller: (seller: LocalProfile | null) => void;
}>({
	cityLocals: [],
	allProducts: [],
	localProfiles: [],
	sellerProfile: [],
	loadLocalProfile: async () => {},
	loadSellerProfile: async (id: number) => {},
	loadLocalsCity: async (id: number) => {},
	createLocalProfile: async (nota: CreateLocalProfile) => {},
	updateLocalProfile: async (id: number, local: UpdateProfile) => {},
	deleteLocalProfile: async (id: number) => {},
	selectedSeller: null,
	setSelectedSeller: (seller: LocalProfile | null) => {},
});

export const useLocalProfiles = () => {
	const context = useContext(LocalProfileContext);
	if (!context) {
		throw new Error("useLocalProfiles must be used whithin a LocalProfilesProviders");
	}
	return context;
};

export const LocalProfilesProvider = ({ children }: Children) => {
	const [localProfiles, setlocalProfiles] = useState<sellerProfile[]>([]);
	const [sellerProfile, setsellerProfile] = useState<sellerProfile[]>([]);
	const [allProducts, setAllProducts] = useState<any[]>([]);
	const [cityLocals, setCityLocals] = useState<sellerProfile[]>([]);
	const [selectedSeller, setSelectedSeller] = useState<LocalProfile | null>(null);
	//obtiene todos los locales
	async function loadLocalProfile() {
		const res = await fetch("/api/locals");
		const data = await res.json();
		setlocalProfiles(data);
	}
	//trae un solo local por id
	async function loadSellerProfile(id: number) {
		try {
			const res = await fetch("/api/locals/" + id);
			const data = await res.json();
			setsellerProfile(data);
		} catch (error) {
			console.log(error);
		}
	}
// trae todos los locales que el usuario puede ver segun su ciudad
	async function loadLocalsCity(id: number) {
		try {
			const res = await fetch("/api/localsByCity/" + id);
			const data = await res.json();

			const localProfiles = data.localProfiles;
			const allProducts = data.allProducts;
			setCityLocals(localProfiles);
			setAllProducts(allProducts);
		} catch (error) {
			console.log(error);
		}
	}
	//crear nuevo negocio y actualiza localprofiles
	const [local, setLocal] = useState(null);
	async function createLocalProfile(localProfile: CreateLocalProfile) {
		const res = await fetch("/api/locals", {
			method: "POST",
			body: JSON.stringify(localProfile),
			headers: {
				"content-Type": "application/json",
			},
		});
		const data = await res.json();
		const newLocal = data.newLocalProfile;
		setLocal(newLocal);
		setlocalProfiles([...localProfiles, newLocal]);
	}

	//eliminar local
	async function deleteLocalProfile(id: number) {
		const res = await fetch("/api/locals/" + id, {
			method: "DELETE",
		});
		setlocalProfiles(localProfiles.filter((local) => local.id != id));
	}

	//editar negocio
	async function updateLocalProfile(id: number, local: UpdateProfile) {
		const res = await fetch("/api/locals/" + id, {
			body: JSON.stringify(local),
			method: "PUT",
			headers: {
				"content-Type": "application/json",
			},
		});
		const data = await res.json();
		setlocalProfiles(localProfiles.map((local) => (local.id === id ? data : local)));
	}
	return (
		<LocalProfileContext.Provider
			value={{
				allProducts,
				loadLocalsCity,
				localProfiles,
				cityLocals,
				sellerProfile,
				loadSellerProfile,
				loadLocalProfile,
				createLocalProfile,
				updateLocalProfile,
				deleteLocalProfile,
				selectedSeller,
				setSelectedSeller,
			}}>
			{children}
		</LocalProfileContext.Provider>
	);
};
