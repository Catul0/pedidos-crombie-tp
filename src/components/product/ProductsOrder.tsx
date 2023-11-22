import React, { useEffect, useState } from "react";
import { useProducts } from "@/context/ProductContext";

const ProductsOrder = ({
	productsOrder,
	idSeller,
}: {
	productsOrder: string;
	idSeller: number;
}) => {
	const { products, loadSellerProducts } = useProducts();
	const [showProducts, setShowProducts] = useState(false);

	useEffect(() => {
		loadSellerProducts(idSeller);
	}, []);

	const ids = productsOrder.split(",");
	const productosOrden: any[] = [];
	ids.forEach((id: any) => {
		const producto = products.find((p) => p.id === parseInt(id));
		if (producto) {
			productosOrden.push({ id: producto.id, productName: producto.productName });
		}
	});

	const productosUnicos = Array.from(new Set(productosOrden.map((p) => p.id))).map((id) => {
		return {
			id: id,
			count: productosOrden.filter((p) => p.id === id).length,
			...productosOrden.find((p) => p.id === id),
		};
	});
	return (
		<div>
			<p
				className="cursor-pointer hover:underline mb-3 mt-3"
				onClick={() => setShowProducts(!showProducts)}>
				{productosOrden.length} producto/s
			</p>
			{showProducts &&
				productosUnicos.map((producto, index) => (
					<div key={index} className="flex items-center justify-center border-b pb-4 mb-4">
						<p>
							{producto.productName} <b>x{producto.count}</b>
						</p>
					</div>
				))}
		</div>
	);
};

export default ProductsOrder;
