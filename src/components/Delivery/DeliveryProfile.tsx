/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useEffect, useState } from 'react';
import { useDeliverys } from '@/context/DeliveryContext';
import CreateVehicle from '@/components/vehicle/createVehicle';
import { useVehicles } from '@/context/VehicleContext';
import { useOrderContext } from '@/context/OrderContext';
import VehicleCard from './VehicleCard';
import { useLocalProfiles } from '@/context/LocalProfileContext';

export default function DeliveryProfile({ params }: { params: { id: string } }) {
  const { userOrders, handleDeliveryTakingOrder, handleDeliveredOrder } = useOrderContext();
  const {loadLocalProfile, localProfiles}= useLocalProfiles();
  const userOrdersFiltered = userOrders.filter((order: any) => order.deliveryId === null && order.status != 'RECHAZADO' && order.status != 'PENDIENTE');
  const deliverysOrder = userOrders.filter((order: any) => order.deliveryId === Number(params.id) && order.status != 'RECIBIDO')
  const { deliveryProfile, loadDeliveryProfile } = useDeliverys();
  const { loadSellerVehicles, sellerCar } = useVehicles();
  const [cargarAuto, setCargarAuto] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const id = Number(params.id)
  const delivery: any = deliveryProfile;
  const [prueba, setPrueba]= useState('');
  useEffect(() => {
    loadDeliveryProfile(Number(id));
    loadLocalProfile();
    console.log(localProfiles)
    loadSellerVehicles(Number(id));
  }, [id]);

  const car: any = sellerCar;

  useEffect(() => {
    // Verificar si el contenido de car es "vehicle not found" y mostrar el mensaje
    if (car && car.message === "Vehicle not found") {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  }, [car]);
  
  return (
    <div className='bg-gray-600 min-h-screen flex justify-center items-center flex-row gap-16'>
      <div className='w-1/4 bg-white rounded-lg shadow-lg p-6'>
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
      {deliverysOrder.length > 0 ? (
        <div className='w-1/4 bg-white rounded-lg shadow-lg p-6'>
        <h1 className='text-lg font-bold'>Tienes un pedido que entregar:</h1>
        <ul>
            {deliverysOrder.map((order) => (
              <li key={order.id} className="mb-4 border border-gray-200 rounded-lg p-4">
                {localProfiles.map((seller) => (
                  seller.id === order.sellerId ?
                    <div key={seller.id}>
                      <h4 className="text-lg font-semibold">Seller Name: {seller.name}</h4>
                      <h4 className="text-lg font-semibold">seller addres: {seller.address}</h4>
                    </div> :<p></p>
                  ))}
                <h4 className="text-lg font-semibold">Productos: {order.products}</h4>
                
                <h4 className="text-lg font-semibold">Status: {order.status}</h4>
                <button onClick={() => handleDeliveredOrder(order.id, order.products, order.sellerId, order.userId, Number(id))} className='bg-red-500'>Ya entregue el pedido</button>
              </li>
            ))}
          </ul>
        </div>
      ): (     
        <div className='w-1/4 bg-white rounded-lg shadow-lg p-6'>
          <h1 className='text-lg font-bold'>No tienes pedidos aisgnados! elige uno:</h1>
        {userOrdersFiltered.length > 0 ? (
          
          <ul>
            {userOrdersFiltered.map((order) => (
              
              <li key={order.id} className="mb-4 border border-gray-200 rounded-lg p-4">
                {localProfiles.map((seller) => (
                  seller.id === order.sellerId ?
                    <div key={seller.id}>
                      <h4 className="text-lg font-semibold">Seller Name: {seller.name}</h4>
                      <h4 className="text-lg font-semibold">seller addres: {seller.address}</h4>
                    </div> :<p></p>
                  ))}
                <h4 className="text-lg font-semibold">Productos: {order.products}</h4>
                <p>seller addres: {}</p>
                {order.status === 'COCINADO' && (
                      <div>
                          <button onClick={() => handleDeliveryTakingOrder(order.id, order.products, order.sellerId, order.userId, Number(id))} className='bg-red-500'>Tomar pedido</button>
                      </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <h1>No hay pedidos por entregar en este momento</h1>
        )}
        </div>
      )}
      
      {cargarAuto ? <CreateVehicle params={params} /> : null}
    </div>
  );
}