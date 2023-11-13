import React, { useEffect, useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import { useLocalProfiles } from '@/context/LocalProfileContext';

const ProductsUser = ({ productsOrder, idSeller }: { productsOrder: string, idSeller: number }) => {
    const {products, loadProducts} = useProducts();
    const {localProfiles, loadLocalProfile} = useLocalProfiles();
    const localProfile = localProfiles.find((l) => l.id === (idSeller));
    const localName = localProfile?.name;
    const localImage = localProfile?.logo;
    const [showProducts, setShowProducts] = useState(false);

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

    const productosUnicos = Array.from(new Set(productosOrden.map(p => p.id)))
    .map(id => {
        return {
        id: id,
        count: productosOrden.filter(p => p.id === id).length,
        ...productosOrden.find(p => p.id === id)
        };
    })
    return (
        <div>
            <div className='flex items-center gap-3'>
                <img className='w-1/6 rounded-md' src={localImage} alt={localName} />
                <h1 className='font-bold'>{localName}</h1>
            </div>
            <p className="cursor-pointer hover:underline" onClick={() => setShowProducts(!showProducts)}>{productosOrden.length} producto/s</p>
            {showProducts && productosUnicos.map((producto, index) => (
            <div key={index} className='flex items-center border-b pb-4 mb-4'>
                <p>{producto.productName} x{producto.count}</p>
                <img className='w-1/6' src={producto.image} alt="" />
            </div>
            ))}
        </div>
    );
};

export default ProductsUser;
