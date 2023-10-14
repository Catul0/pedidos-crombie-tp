/* eslint-disable @next/next/no-img-element */
import React from 'react';

function ProductCard({ product }: { product: any }) {
    return (
        <div key={product.id} className='bg-gray-200 p-4 my-2 rounded-md flex justify-between w-auto'>
            <div className='h-max max-w-full rounded-lg'>
                <div className="product-image">
                    {product.image ? (
                        <img src={product.image} className='h-[100px] m-auto' alt="Imagen del producto" />
                    ) : (
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/007/126/739/small/question-mark-icon-free-vector.jpg" alt="Producto sin imagen" />
                    )}
                </div>
                <h2>{product.productName}</h2>
                <p>Precio: ${product.price}</p>
                <div className='w-[100%] p-auto flex justify-center'>
                    <button className='bg-gray-400 text-black m-auto rounded-lg px-4'>Ver Producto</button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
