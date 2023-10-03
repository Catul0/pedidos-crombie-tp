import React from 'react'
import { useLocalProfiles } from "@/context/LocalProfileContext";
import { useEffect } from 'react'
import LocalCard from "@/components/seller/LocalCard";
import { LocalProfile } from '@prisma/client';
const LocalsProfiles = () => {

    const { localProfiles, loadLocalProfile } = useLocalProfiles();

    useEffect(() => {
        loadLocalProfile();
    }, [])

    return (
        <div className='flex items-center justify-center bg-slate-900 h-[100%]' id='sellers'>
            <div>
                <h1 className="text-white text-center">ACA ESTAN LOS VENDEDORES</h1>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-24 2xl:px-[350px] ">
                    {localProfiles.map(local => (
                        <LocalCard local={local} key={local.id} />
                    ))
                    }
                </div>


            </div>
        </div>
    )
}

export default LocalsProfiles