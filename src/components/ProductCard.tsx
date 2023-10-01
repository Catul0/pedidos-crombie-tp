import React from 'react'
import { Product } from '@prisma/client'
import { useProducts } from '@/context/ProductContext'



function ProductCard({ product }: { product: Product }) {
    const { setSelectedProduct,deleteProduct } = useProducts();
    return (
        <div key={product.id} className='bg-slate-400 p-4 my-2 rounded-md flex justify-between w-auto' >
            <div className='h-max max-w-full rounded-lg'>
                <div className='h-[250px]'>
                    {product.image ? <img src={product.image} className='h-[100px] m-auto' alt="imagen del negocio" /> : <img src="https://static.vecteezy.com/system/resources/thumbnails/007/126/739/small/question-mark-icon-free-vector.jpg" alt="" />}
                    <h2><b>{product.productName}</b></h2>
                    <p>{product.description}</p>
                    <p>Precio: {product.price}</p>
                </div>
                <button className='bg-slate-900 text-slate-100 rounded-lg w-[100%]'>COMPRAR</button>
                <div className='flex justify-between py-2'>
                    <button className='bg-slate-900 text-slate-100 rounded-lg w-[45%]'
                        onClick={async () => {
                            setSelectedProduct(product)
                        }}
                    >EDITAR</button>
                    <button onClick={async () => {
                        if (confirm("Estas seguro de que quieres eliminar nota?")) {
                            await deleteProduct(product.id)
                        }
                    }} className=' text-white bg-red-600 rounded-md hover:bg-red-500 w-[45%]' >ELIMINAR</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard