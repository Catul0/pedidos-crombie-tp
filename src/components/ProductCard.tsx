import React from 'react'
import {  Product } from '@prisma/client'



function ProductCard({ product }: { product: Product }) {
    return (
        <div key={product.id} className='bg-slate-400 p-4 my-2 rounded-md flex justify-between w-auto' >
            <div className='h-max max-w-full rounded-lg'>
                {product.image ? <img src={product.image} className='h-[100px] m-auto' alt="imagen del negocio" /> : <img src="https://static.vecteezy.com/system/resources/thumbnails/007/126/739/small/question-mark-icon-free-vector.jpg" alt="" />}
                <h2>{product.productName}</h2>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <button className='bg-slate-900 text-slate-100 rounded-lg'>COMPRAR</button>
            </div>
        </div>
    )
}

export default ProductCard