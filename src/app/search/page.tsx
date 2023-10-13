/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useState } from 'react';
import { useLocalProfiles } from "@/context/LocalProfileContext";
import { useEffect } from 'react';
import LocalCard from "@/components/seller/LocalCard";
import { sellerProfile } from '@/interfaces/LocalProfile';

const Buscador = () => {
    const { localProfiles, loadLocalProfile } = useLocalProfiles();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredLocalProfiles, setFilteredLocalProfiles] = useState<sellerProfile[]>([]);
    const [initialResultsCount, setInitialResultsCount] = useState(6);

    useEffect(() => {
        loadLocalProfile();
    }, []);

    // Función para filtrar los perfiles locales
    useEffect(() => {
        const filteredProfiles = localProfiles.filter((local) =>
            local.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredLocalProfiles(filteredProfiles);
    }, [searchTerm, localProfiles]);

    return (
        <div className='flex items-center justify-center bg-white h-[100%]' id='sellers'>
            <div>
                <h1 className="text-white text-center">ACA ESTAN LOS VENDEDORES</h1>
                <input
                    type="text"
                    placeholder="Buscar vendedores por nombre"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

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
            </div>
        </div>
    );
};

export default Buscador;
