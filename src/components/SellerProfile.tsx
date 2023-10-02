/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { useLocalProfiles } from '@/context/LocalProfileContext'
import SellersProducts from './SellersProducts';
import Link from 'next/link';
import CreateProduct from './CreateProduct';
import EditSeller from './EditSeller';


export default function SellerProfile({ params }: { params: { id: string } }) {
    const { sellerProfiles, loadSellerProfile, setSelectedSeller, selectedSeller } = useLocalProfiles();
    const id = params.id;
    const seller: any = sellerProfiles;
    useEffect(() => {
        loadSellerProfile(Number(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seller])
    
    return (
        <>

            <div className='flex justify-between bg-slate-900 h-[100%] px-8' id='sellers'>
                <div className='flex justify-center'>
                    <div className="  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <img className=" rounded-t-lg px-2 max-w-md" src={seller.logo} alt="" />
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{seller.name}</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{seller.type}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{seller.description}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{seller.address} from {seller.city}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{seller.averageScore}</p>
                        </div>
                        <button className='bg-slate-900 text-slate-100 rounded-lg w-[100%]'
                            onClick={()=>{
                                if(selectedSeller){
                                    setSelectedSeller(null)
                                }else{
                                    setSelectedSeller(seller)
                                }
                                    
                             }}
                        >{selectedSeller? "CANCELAR":"EDITAR PERFIL"}</button>
                        {
                            selectedSeller? <EditSeller/>:<p></p>
                        }
                    </div>
                    
                </div>

                <SellersProducts params={params} />
            </div>
            <div className='px-24 2xl:px-[350px] py-8  bg-slate-900'>
                <CreateProduct params={params} />
            </div>

        </>

    )
}
