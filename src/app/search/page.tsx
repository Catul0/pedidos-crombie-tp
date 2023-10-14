/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useState } from 'react';
import { useLocalProfiles } from "@/context/LocalProfileContext";
import { useEffect } from 'react';
import LocalCard from "@/components/seller/LocalCard";
import { sellerProfile } from '@/interfaces/LocalProfile';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/product/CardProduct';
import { Product } from '@prisma/client';

const Buscador = () => {
    const { localProfiles, loadLocalProfile } = useLocalProfiles();
    const { products, loadProducts } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredLocalProfiles, setFilteredLocalProfiles] = useState<sellerProfile[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [initialResultsCount, setInitialResultsCount] = useState(6);

    useEffect(() => {
        loadLocalProfile();
        loadProducts();
    }, []);

    useEffect(() => {
        const filteredProfiles = localProfiles.filter((local) =>
            local.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredLocalProfiles(filteredProfiles);

        const filteredProds = products.filter((prod) =>
            prod.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filteredProds);
    }, [searchTerm, localProfiles, products]);

    return (
        <div className='flex items-center justify-center bg-white h-[100%] p-10' id='sellers' >
            <div className='flex flex-col items-center justify-center bg-white h-[100%]'>
                <input
                    type="text"
                    placeholder="Buscar restaurantes, comidas, productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-400 h-12 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"/>

                <h1 className="text-black text-center font-bold">Restaurantes</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-24 2xl:px-[350px]">
                    {searchTerm === ''
                        ? filteredLocalProfiles.slice(0, initialResultsCount).map((local) => (
                            <LocalCard local={local} key={local.id} />
                        ))
                        : filteredLocalProfiles.map((local) => (
                            <LocalCard local={local} key={local.id} />
                        ))}
                </div>

                {searchTerm === '' && (
                    <button onClick={() => setInitialResultsCount(initialResultsCount + 6)}>Cargar más resultados</button>
                )}
                <h1 className="text-black text-center font-bold">Comidas</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-24 2xl:px-[350px]">
                    {searchTerm === ''
                        ? filteredProducts.slice(0, initialResultsCount).map((product) => (
                            <ProductCard product={product} key={product.id} />
                        ))
                        : filteredProducts.map((product) => (
                            <ProductCard product={product} key={product.id} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Buscador;
