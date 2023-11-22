/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Product } from "@prisma/client";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import Swal from "sweetalert2";

function ProductCard({
	product,
	isTrue,
	setShowPopup,
}: {
	product: Product;
	isTrue: boolean | null;
	setShowPopup: (show: boolean) => void;
}) {
	const { setSelectedProduct, deleteProduct } = useProducts();
	const { addToCart } = useCart();
	const handleBuyClick = () => {
		addToCart(product);
		setShowPopup(true);
		setTimeout(() => {
			setShowPopup(false);
		}, 3000);
	};
	return (
		<div
			key={product.id}
			className="bg-[#F7F8F9] p-5 rounded-md gap-20 flex flex-col md:flex-row justify-between w-full transform hover:scale-105 transition-transform duration-300 ease-in-out">
			<div className="h-max w-full rounded-lg flex gap-8 shadow-md bg-white p-5 justify-between">
				<div className="flex flex-row items-center gap-7">
					{product.image ? (
						<img src={product.image} className="w-1/4" alt="imagen del negocio" />
					) : (
						<img
							src="https://static.vecteezy.com/system/resources/thumbnails/007/126/739/small/question-mark-icon-free-vector.jpg"
							alt=""
						/>
					)}
					<div className="flex flex-col">
						<h2>
							<b>{product.productName}</b>
						</h2>
						<p className="hidden md:flex">{product.description}</p>
						<p>
							<b>${product.price}</b>
						</p>
					</div>
				</div>
				{
					// si es false istrue va a mostrarlo y sino no
					!isTrue && (
						<div className="flex gap-10 items-center p-5 flex-col justify-center">
							<button
								onClick={() => handleBuyClick()}
								className="text-black hover:text-green-500 transform hover:scale-110">
								<IconShoppingCartPlus style={{ fontSize: "2rem" }} />
							</button>
						</div>
					)
				}
				{/* si isTrue es true va a mostrar los botones y sino no */}
				{isTrue && (
					<div className="flex gap-10 items-center p-5 flex-col justify-center">
						<button
							className="font-bold bg-green-600 p-2 text-slate-100 w-full rounded-lg"
							onClick={async () => {
								setSelectedProduct(product);
							}}>
							Editar
						</button>
						<button
							onClick={async () => {
								Swal.fire({
									title: "¿Quieres eliminar este producto?",
									text: "No podrás revertir esto",
									icon: "warning",
									showCancelButton: true,
									confirmButtonColor: "green",
									cancelButtonColor: "#d33",
									confirmButtonText: "Si, borrar!"
								  }).then((result) => {
									if (result.isConfirmed) {
										deleteProduct(product.id)
									  Swal.fire({
										title: "Borrado!",
										text: "Se ha borrado este producto",
										icon: "success"
									  });
									}
								  });
							}}
							className="text-white font-bold bg-red-600 p-2 rounded-md w-full hover:bg-red-500">
							Eliminar
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default ProductCard;
