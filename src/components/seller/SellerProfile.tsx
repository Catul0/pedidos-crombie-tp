"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useLocalProfiles } from "@/context/LocalProfileContext";
import SellersProducts from "./SellersProducts";
import CreateProduct from "../product/CreateProduct";
import EditSeller from "./EditSeller";
import Cart from "../cart/Cart";
import BackButton from "../BackButton";
import { IconShoppingCart, IconBell, IconUserCircle } from "@tabler/icons-react";
import { useCart } from "@/context/CartContext";
import Orders from "../orders/Order";
import { useOrderContext } from "@/context/OrderContext";
import { useScores } from "@/context/ScoreContext";
import PuntajeConEstrellas from "../Stars";
import { decode } from "jsonwebtoken";
import Cookies from "js-cookie";
import Link from "next/link";
import Popup from "../PopUp";

export default function SellerProfile({
	params,
	isTrue,
}: {
	params: { id: string };
	isTrue: boolean | null;
}) {
	const token: any = Cookies.get("token");
	let iduser;
	if (token) {
		const decodedToken: any = decode(token);
		iduser = decodedToken.id;
	}
	const id = params.id;
	const { loadOrders, localOrders } = useOrderContext();
	const { sellerProfile, loadSellerProfile, setSelectedSeller, selectedSeller } =
		useLocalProfiles();
	const { cart } = useCart();
	const { loadScores, scores } = useScores();
	const seller: any = sellerProfile;
	const userOrdersFiltered = localOrders;
	const pendingOrders = userOrdersFiltered.filter((order) => order.status === "PENDIENTE");
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [renderedComponent, setRenderedComponent] = useState<JSX.Element | null>(null);
	const [puntaje, setPuntaje] = useState(5);
	useEffect(() => {
		if (scores && scores.length > 0) {
			const sellerScores = scores.filter((score) => score.localId === Number(id));

			if (sellerScores.length > 0) {
				const totalScore = sellerScores.reduce((accumulator, currentScore) => {
					return accumulator + currentScore.score;
				}, 0);
				const averageScore = totalScore / sellerScores.length;
				const roundedAverageScore = averageScore.toFixed(1);
				setPuntaje(Number(roundedAverageScore));
			}
		}
	}, [id, scores]);
	useEffect(() => {
		// realiza la carga del perfil del vendedor solo si no se ha cargado previamente o si el ID ha cambiado
		if (!seller || seller.id !== Number(id)) {
			loadSellerProfile(Number(id));
			loadOrders(Number(id));
			loadScores();
		}
	}, [id, seller, loadSellerProfile]);

	//decide que renderizar segun si quien esta viendo la pag es un usuario (cart) o un vendedor (orders)
	useEffect(
		() => setRenderedComponent(isTrue ? <Orders params={params} /> : <Cart />),
		[isTrue, params]
	);

	useEffect(() => {
		// desactiva el desplazamiento en el cuerpo de la página cuando se abre la ventana emergente
		if (isCartOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [isCartOpen]);
	const [showPopup, setShowPopup] = useState(false);
	return (
		<>
			<div className="bg-white h-16 flex items-center justify-between px-10 border-b border-gray-300">
				<BackButton />
				<p className="hidden md:flex text-black px-4 py-2 font-semibold">
					Pedidos Crombie - {seller.name}
				</p>
				<div className="flex flex-row gap-7 items-center">
					{isTrue ? (
						<p></p>
					) : (
						<Link href={"/users/" + iduser}>
							<IconUserCircle size={40} />
						</Link>
					)}
					{isTrue ? (
						<button onClick={() => setIsCartOpen(!isCartOpen)}>
							{pendingOrders.length > 0 && (
								<span
									style={{
										position: "absolute",
										top: "5px",
										right: "35px",
										backgroundColor: "#0E9F6E",
										color: "white",
										borderRadius: "50%",
										width: "20px",
										height: "20px",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										zIndex: 1,
									}}>
									{pendingOrders.length}
								</span>
							)}
							<IconBell size={35} />
						</button>
					) : (
						<button onClick={() => setIsCartOpen(!isCartOpen)}>
							{cart.length > 0 && (
								<span
									style={{
										position: "absolute",
										top: "5px",
										right: "35px",
										backgroundColor: "##0E9F6E",
										color: "white",
										borderRadius: "50%",
										width: "20px",
										height: "20px",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										zIndex: 1,
									}}>
									{cart.length}
								</span>
							)}
							<IconShoppingCart size={35} />
						</button>
					)}
				</div>
			</div>

			<div className="flex flex-col md:flex-row bg-[#F7F8F9] m-5 h-auto py-10 justify-center">
				{showPopup && <Popup message={`Producto añadido al carrito`} />}
				<div className="w-full md:w-1/4 bg-[#F7F8F9]">
					<div className="flex flex-col items-center p-4 text-center bg-white border border-gray-200 ml-5 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
						<img className="rounded-t-lg px-2 max-w" src={seller.logo} alt="" />
						<div className="p-5">
							<a href="#">
								<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
									{seller.name}
								</h5>
							</a>
							<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{seller.type}</p>
							<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
								{seller.description}
							</p>
							<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{seller.address}</p>
							<PuntajeConEstrellas puntaje={puntaje} />
						</div>
						{isTrue && (
							<button
								className="bg-green-600 text-white text-bold rounded-lg w-1/2 p-2"
								onClick={() => {
									if (selectedSeller) {
										setSelectedSeller(null);
									} else {
										setSelectedSeller(seller);
									}
								}}>
								{selectedSeller ? "Cancelar" : "Editar perfil"}
							</button>
						)}
						{selectedSeller ? <EditSeller /> : <p></p>}
					</div>
				</div>
				{/* productos */}
				<div className="w-full md:w-2/4">
					<SellersProducts setShowPopup={setShowPopup} params={params} isTrue={isTrue} />
				</div>
				{/* carrito */}
				{isCartOpen && (
					<div className="absolute inset-0 flex items-center justify-center z-50 overflow-auto">
						<div className="bg-gray-100 border w-full h-full border-gray-200 shadow-lg p-4">
							<button
								className="text-black font-bold text-2xl"
								onClick={() => setIsCartOpen(!isCartOpen)}>
								X
							</button>
							{renderedComponent}
						</div>
					</div>
				)}
				{/* crear producto */}
				{isTrue && (
					<div className="w-full md:w-1/4 p-4 bg-white border border-gray-200 mr-5 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
						<CreateProduct params={params} />
					</div>
				)}
			</div>
		</>
	);
}
