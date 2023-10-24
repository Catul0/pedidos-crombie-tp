/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Product } from '@prisma/client'
import { useProducts } from '@/context/ProductContext'
import { useCart } from '@/context/CartContext';

function ProductCard({ product, isTrue }: { product: Product, isTrue: boolean | null }) {
    const { setSelectedProduct,deleteProduct } = useProducts();
    const { addToCart } = useCart();
    const handleBuyClick = () => {
        addToCart(product);
    }
    return (
        <div key={product.id} className='bg-white p-4 my-2 rounded-md flex justify-between w-full shadow-md border border-gray-300'>
            <div className='h-max max-w-full rounded-lg'>
                <div>
                    {product.image ? <img src={product.image} className='h-[100px] m-auto' alt="imagen del negocio" /> : <img src="https://static.vecteezy.com/system/resources/thumbnails/007/126/739/small/question-mark-icon-free-vector.jpg" alt="" />}
                    <h2><b>{product.productName}</b></h2>
                    <p>{product.description}</p>
                    <p><b>${product.price},00</b></p>
                </div>
                {
                // si es false istrue va a mostrarlo y sino no
                !isTrue && (
                    <button onClick={() => handleBuyClick()} className='bg-slate-900 text-slate-100 rounded-lg w-[100%]'>COMPRAR</button>
                )
                }
                {/* si isTrue es true va a mostrar los botones y sino no */}
                {
                isTrue && (
                <div className='flex justify-between py-2'>
                    <button className='bg-green-600 text-slate-100 rounded-lg w-[45%]'
                        onClick={async () => {
                            setSelectedProduct(product)
                        }}
                    >EDITAR</button>
                    <button onClick={async () => {
                        if (confirm("Estas seguro de que quieres eliminar producto?")) {
                            await deleteProduct(product.id)
                        }
                    }} className=' text-white bg-red-600 rounded-md hover:bg-red-500 w-[45%]' >ELIMINAR</button>
                </div>
                )}
            </div>
        </div>
    )
}

export default ProductCard