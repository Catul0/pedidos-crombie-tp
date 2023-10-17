/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import ProductCard from '../product/ProductCard';
import { useProducts } from '@/context/ProductContext';
import Link from 'next/link';

function SellersProducts({ params, isTrue }: { params: { id: string }, isTrue: boolean | null }) {
  const { products, loadSellerProducts } = useProducts();
  const id = Number(params.id);

  useEffect(() => {
    loadSellerProducts(id);
  }, []);

  return (
    <div className='flex  justify-center bg-slate-900 h-[100%]' id='sellers'>
      <div className=''>
        <h1 className="text-white text-center">Tus Productos {id}</h1>
        <Link className="text-white text-center m-auto" href={'/sellers'}>
          <h2> VOLVER A LOS VENDEDORES </h2>
        </Link>

        {products.length < 3 && isTrue ? (
          <div className="bg-red-500 text-white p-2 mt-4 text-center rounded">
            Tienes menos de 3 productos cargados. Debes ingresar al menos 3 para comenzar a vender.
          </div>
        ) : null}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-8 ">
            {products.map(product => (
              <ProductCard product={product} key={product.id} isTrue={isTrue} />
            ))}
          </div>
      </div>
    </div>
  );
}

export default SellersProducts;
