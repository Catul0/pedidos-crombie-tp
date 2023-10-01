import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '@/context/ProductContext';
import Link from 'next/link';



function SellersProducts({ params }: {params: {id: string}}) {
    const { products,loadSellerProducts } = useProducts();
    const id = Number(params.id) 
    //const [loadedProducts, setLoadedProducts] = useState([]); // Estado para almacenar los productos cargados

    useEffect(() => {
        // Cargar los productos del vendedor cuando se monta el componente
        loadSellerProducts(id);
    }, []);

    return (
        <div className='flex  justify-center bg-slate-900 h-[100%]' id='sellers'>
            <div className=''>
                <h1 className="text-white text-center">ACA ESTAN LOS PRODUCTOS DEL VENDEDOR {id}</h1>
                <Link className="text-white text-center m-auto" href={'/sellers'}> <h2 > VOLVER A LOS VENDEDORES </h2> </Link>

                {
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-8 ">
                        {products.map(product => (
                            <ProductCard product={product} key={product.id} />
                        ))}
                    </div>}
            </div>
        </div>
    );
}

export default SellersProducts;
