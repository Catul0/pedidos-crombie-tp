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
    console.log(car)
    return (
    <div className='bg-gray-600 min-h-screen flex justify-center items-center'>
    
    <div className='max-w-md bg-white rounded-lg shadow-lg p-6'>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">{delivery.name} {delivery.lastName}</h2>
        <p className="text-gray-700 mb-4">Puntaje Promedio: {delivery.averageScore}</p>
      </div>
      <div className="border-t border-gray-200 mt-6 pt-6">
        <VehicleCard car={car} />
      </div>
      <button
        onClick={() => {
          setCargarAuto(!cargarAuto);
        }}
        className='bg-gray-800 text-white text-xl mt-4 py-2 px-4 rounded-full w-full'>
        {cargarAuto ? "Cancelar" : "Cargar Nuevo Auto"}
      </button>
    </div>
    {cargarAuto ? <CreateVehicle params={params} /> : null}
  </div>
  
    )
}
