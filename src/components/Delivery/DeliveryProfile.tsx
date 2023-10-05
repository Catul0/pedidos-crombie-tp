"use client"
import { useEffect, useState } from 'react'
import { useDeliverys } from '@/context/DeliveryContext'
import CreateVehicle from '@/components/vehicle/createVehicle'
import { useVehicles } from '@/context/VehicleContext';
import VehicleCard from './VehicleCard';

export default function DeliveryProfile({ params }: { params: { id: string } }) {
    const { deliveryProfile, loadDeliveryProfile } = useDeliverys();
    const { loadSellerVehicles, sellerCar } = useVehicles();
    const [cargarAuto, setCargarAuto] = useState(false);
    const id = params.id;
    const delivery: any = deliveryProfile;
    useEffect(() => {
        loadDeliveryProfile(Number(id));
        loadSellerVehicles(Number(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const car:any = sellerCar;
    return (
        <>
            <div className='max-w-sm  m-auto'>
                <div className="  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-5">

                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{delivery.name} {delivery.lastName}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{delivery.averageScore}</p>
                    </div>
                </div>
                <VehicleCard car={car} />
                <button
                    onClick={()=>{
                        setCargarAuto(!cargarAuto);
                    }}
                 className='bg-gray-800 rounded-lg text-2xl w-[100%] text-white max-w-sm border-gray-200 px-4 '>{cargarAuto?"Cancelar":"Cargar Nuevo Auto"}</button>
            </div>
            {
                cargarAuto? <CreateVehicle params={params} /> : <p></p>
            }
            
        </>
    )
}
