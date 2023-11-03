import React, { useEffect } from 'react';
import { useProducts } from '@/context/ProductContext';
import { useLocalProfiles } from '@/context/LocalProfileContext';

const ProductsUser = ({ productsOrder, idSeller }: { productsOrder: string, idSeller: number }) => {
    const {products, loadProducts} = useProducts();
    const {localProfiles, loadLocalProfile} = useLocalProfiles();
    const localName = localProfiles.find((l) => l.id === (idSeller))?.name
    useEffect(() => {
        loadProducts();
        loadLocalProfile();
    }, []);
    const ids = productsOrder.split(",");
    const productosOrden: any[]=[];
    ids.forEach((id: any) => {
        const producto = products.find((p) => p.id === parseInt(id));
        if (producto) {
            productosOrden.push({id: producto.id,productName: producto.productName, image: producto.image});
        }
    });
    return (
        <>
            <h1 className='font-bold'>{localName}</h1>
            {productosOrden.map((producto, index) => (
                <div key={index}>
                    <h1>{producto.nameLocal}</h1>
                    <p>{producto.productName}</p>
                    <img className='w-1/2' src={producto.image} alt={producto.productName} />
                </div>
            ))}
        </>
    );
};

export default ProductsUser;
