/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState } from "react";
import { useLocalProfiles } from "@/context/LocalProfileContext";
import { useEffect } from "react";
import LocalCard from "@/components/seller/LocalCard";
import { sellerProfile } from "@/interfaces/LocalProfile";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "@/components/product/CardProduct";
import { Product } from "@prisma/client";
import BackButton from "../BackButton";
import { IconUserCircle } from "@tabler/icons-react";
import { decode } from "jsonwebtoken";
import Cookies from "js-cookie";
import Link from "next/link";

function Search() {
  const token: any = Cookies.get("token");
    const { localProfiles, loadLocalProfile, loadLocalsCity, cityLocals } = useLocalProfiles();
    const { products, loadProducts } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredLocalProfiles, setFilteredLocalProfiles] = useState<sellerProfile[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [initialResultsCount, setInitialResultsCount] = useState(6);
    const [id, setId] = useState('')

    useEffect(() => {
      if (token) {
        const decodedToken: any = decode(token);
        setId(decodedToken.id);
      }
    }, [token]);
    
    useEffect(() => {
        loadLocalProfile();
        loadProducts();
        loadLocalsCity(Number(id))
    }, [id]);
    
    useEffect(() => {
      if (Array.isArray(cityLocals)) {
        const filteredProfiles = cityLocals.filter((local) =>
          local.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredLocalProfiles(filteredProfiles);
      }
    
      const filteredProds = products.filter((prod) =>
        prod.productName.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredProducts(filteredProds);
    }, [searchTerm, localProfiles, products]);  
  return (
    <>
    <div className="fixed z-10 w-full bg-white h-16 flex items-center justify-between px-10 border-b border-gray-300">
      <BackButton />
      <p className="text-black px-4 py-2 font-semibold">
        Pedidos Crombie
      </p>
      <div className="flex flex-row gap-7 items-center">
        <Link href={'/users/' + id}>
          <IconUserCircle size={40} />
        </Link>
      </div>
    </div>
    <div
      className="flex items-center justify-center bg-white h-[100%] p-10 pt-20"
      id="sellers"
      >
      <div className="flex flex-col items-center justify-center bg-white h-[100%]">
        <input
          type="text"
          placeholder="Buscar restaurantes, comidas, productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-100 h-12 rounded-lg px-6 py-4 border border-gray-300 focus:outline-none focus:border-blue-500"
          />

        <div className='flex items-center justify-center bg-white h-[100%] p-10' id='sellers' >
            <div className='flex flex-col items-center justify-center bg-white h-[100%]'>
                <h1 className="text-black text-left font-bold py-1">Restaurantes:</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-24">
                  {searchTerm === ''
                    ? filteredLocalProfiles.slice(0, initialResultsCount).map((local) => (
                      <LocalCard local={local} key={local.id} />
                    ))
                    : filteredLocalProfiles.map((local) => (
                      <LocalCard local={local} key={local.id} />
                    ))}
                </div>
                {searchTerm === '' && (
                  <button className='hover:text-green-700' onClick={() => setInitialResultsCount(initialResultsCount + 6)}>Cargar más resultados</button>
                  )}
                <h1 className="text-black text-center font-bold py-1">Comidas:</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-24">
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
      </div>
    </div>
    </>
  );
}

export default Search;
