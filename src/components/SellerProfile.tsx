import React, { useEffect } from 'react'
import { useLocalProfiles } from '@/context/LocalProfileContext'
import SellersProducts from './SellersProducts';


export default function SellerProfile({ params }: { params: { id: string } }) {
    const { localProfiles, loadSellerProfile } = useLocalProfiles();
    const id = params.id;
    useEffect(() => {
        loadSellerProfile(Number(id));
    }, [])
    const seller:any = localProfiles;

    return (
        <div className='flex  justify-center bg-slate-900 h-[1000px]' id='sellers'>

            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="rounded-t-lg" src={seller.logo} alt="" />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{seller.name}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{seller.type}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{seller.description}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{seller.address} from {seller.city}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{seller.averageScore}</p>
                </div>
            </div>
            <SellersProducts params={params} />
        </div>

    )
}
