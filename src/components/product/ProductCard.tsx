/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Product } from '@prisma/client'
import { useProducts } from '@/context/ProductContext'
import { useCart } from '@/context/CartContext';
import {IconShoppingCartPlus} from '@tabler/icons-react'

function ProductCard({ product, isTrue }: { product: Product, isTrue: boolean | null }) {
    const { setSelectedProduct,deleteProduct } = useProducts();
    const { addToCart } = useCart();
    const handleBuyClick = () => {
        addToCart(product);
    }
    return (
        <div key={product.id} className='bg-[#F7F8F9] p-5 rounded-md gap-20 flex justify-between w-full transform hover:scale-105 transition-transform duration-300 ease-in-out'>
            <div className='h-max w-full rounded-lg flex gap-8 shadow-md bg-white p-5 justify-between'>
                <div className='flex flex-row items-center gap-7'>
                    {product.image ? <img src={product.image} className='w-1/4' alt="imagen del negocio" /> : <img src="https://static.vecteezy.com/system/resources/thumbnails/007/126/739/small/question-mark-icon-free-vector.jpg" alt="" />}
                    <div className='flex flex-col'>
                    <h2><b>{product.productName}</b></h2>
                    <p>{product.description}</p>
                    <p><b>${product.price}</b></p>
                    </div>
                </div>
                {
                // si es false istrue va a mostrarlo y sino no
                !isTrue && (
                <div className='flex gap-10 items-center p-5 flex-col justify-center'>
                    <button onClick={() => handleBuyClick()} className="text-black hover:text-green-500 transform hover:scale-110"><IconShoppingCartPlus style={{ fontSize: '2rem'}} /></button>
                </div>
                )
                }
                {/* si isTrue es true va a mostrar los botones y sino no */}
                {
                isTrue && (
                <div className='flex gap-10 items-center p-5 flex-col justify-center'>
                    <button className='font-bold bg-green-600 p-2 text-slate-100 w-full rounded-lg'
                        onClick={async () => {
                            setSelectedProduct(product)
                        }}
                    >Editar</button>
                    <button onClick={async () => {
                        if (confirm("Estas seguro de que quieres eliminar producto?")) {
                            await deleteProduct(product.id)
                        }
                    }} className='text-white font-bold bg-red-600 p-2 rounded-md w-full hover:bg-red-500'>Eliminar</button>
                </div>
                )}
            </div>
        </div>
    )
}

export default ProductCard