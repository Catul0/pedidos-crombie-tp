/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";

function ProductCard({ product }: { product: any }) {
  return (
    <div
      key={product.id}
      className="bg-gray-200 p-4 my-2 rounded-md flex justify-between w-auto"
    >
      <div className="h-max max-w-full rounded-lg">
        <div className="product-image">
          <img
            src={product.image}
            className="h-[100px] m-auto"
            alt="Imagen del producto"
          />
        </div>
        <h2>{product.productName}</h2>
        <p>${product.price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
