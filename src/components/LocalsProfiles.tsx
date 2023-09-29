import React from 'react'
import { useLocalProfiles } from "@/context/LocalProfileContext";
import { useEffect } from 'react'
import LocalCard from "@/components/LocalCard";

const LocalsProfiles = () => {

    const { localProfiles, loadLocalProfile } = useLocalProfiles();

    useEffect(() => {
        loadLocalProfile();
    }, [])

    return (
        <div className='flex items-center justify-center bg-slate-900'>
            <div>
                <h1 className="text-white">ACA ESTAN LOS VENDEDORES</h1>
                {localProfiles.map(local => (
                    <LocalCard local={local} key={local.id} />
                ))
                }
            </div>
        </div>
    )
}

export default LocalsProfiles