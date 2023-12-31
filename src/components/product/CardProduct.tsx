/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
function ProductCard({ product }: { product: any }) {
	return (
		<>
			<Link href={"/sellers/" + product.sellerId}>
				<div
					key={product.id}
					className="bg-white p-4 my-2 rounded-md flex justify-between w-auto transform transition-all duration-300 hover:scale-105">
					<div className="h-max max-w-full rounded-lg flex items-center gap-4">
						<img
							src={product.image}
							className="w-1/2 h-24 object-cover m-auto"
							alt="Imagen del producto"
						/>
						<div className="flex flex-col">
							<h2>
								<b>{product.productName}</b>
							</h2>
							<p>${product.price}</p>
						</div>
					</div>
				</div>
			</Link>
		</>
	);
}

export default ProductCard;
