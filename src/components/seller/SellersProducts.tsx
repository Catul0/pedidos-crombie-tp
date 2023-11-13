/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import ProductCard from "../product/ProductCard";
import { useProducts } from "@/context/ProductContext";

function SellersProducts({
  params,
  isTrue,
}: {
  params: { id: string };
  isTrue: boolean | null;
}) {
  const { products, loadSellerProducts } = useProducts();
  const id = Number(params.id);

  useEffect(() => {
    loadSellerProducts(id);
  }, []);

  return (
    <div className="flex justify-center bg-[#F7F8F9] h-full p-10" id="sellers">
      <div className="">
        {products.length < 3 && isTrue ? (
          <div className="bg-red-500 text-white p-2 m-4 text-center rounded">
            Tienes menos de 3 productos cargados. <br /> Debes ingresar al menos
            3 para comenzar a vender.
          </div>
        ) : null}

        <div className="">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} isTrue={isTrue} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellersProducts;
