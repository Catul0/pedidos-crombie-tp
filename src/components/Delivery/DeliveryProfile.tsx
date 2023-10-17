/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDeliverys } from '@/context/DeliveryContext';
import CreateVehicle from '@/components/vehicle/createVehicle';
import { useVehicles } from '@/context/VehicleContext';
import VehicleCard from './VehicleCard';

export default function DeliveryProfile({ params }: { params: { id: string } }) {
  const { deliveryProfile, loadDeliveryProfile } = useDeliverys();
  const { loadSellerVehicles, sellerCar } = useVehicles();
  const [cargarAuto, setCargarAuto] = useState(false);
  const [showMessage, setShowMessage] = useState(false); // Nuevo estado
  const id = params.id;
  const delivery: any = deliveryProfile;

  useEffect(() => {
    loadDeliveryProfile(Number(id));
    loadSellerVehicles(Number(id));
  }, [id]);

  const car: any = sellerCar;
  console.log(car);

  useEffect(() => {
    // Verificar si el contenido de car es "vehicle not found" y mostrar el mensaje
    if (car && car.message === "Vehicle not found") {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  }, [car]);
  
  return (
    <div className='bg-gray-600 min-h-screen flex justify-center items-center'>
      <div className='max-w-md bg-white rounded-lg shadow-lg p-6'>
        <div className="text-center">
      {showMessage && (
        <div className="bg-red-500 text-white p-2 mt-4 text-center rounded">
          Inhabilitado para repartir: <br /> Debes cargar un vehiculo.
        </div>
      )}
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
  );
}
