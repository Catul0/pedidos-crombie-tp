import React from 'react';
import { useOrderContext } from '@/context/OrderContext';

function Orders({params}: {params: { id: string };}) {
  const id = params.id
  const { userOrders, isLoading, handleAcceptOrder, handleRejectOrder, handlePrepareOrder, handleCookOrder, handleFinishOrder } = useOrderContext();
  const userOrdersFiltered = userOrders.filter((order: any) => order.sellerId === Number(id));
  return (
    <div className="text-center bg-gray-100 p-4 rounded-lg">
      <h2 className="text-gray-800 text-2xl font-bold mb-4"><b>Ordenes actuales</b></h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {userOrders.length > 0 ? (
            <ul className="mt-4">
              {userOrdersFiltered.map((order) => (
                <li key={order.id} className="mb-4 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold">SellerId: {order.sellerId}</h4>
                  <h4 className="text-lg font-semibold">{order.products}</h4>
                  <h4 className="text-lg font-semibold">{order.status}</h4>
                  {order.status === 'PENDIENTE' && (
                    <div>
                        <button onClick={() => handleAcceptOrder(order.id, order.products, order.sellerId, order.userId)} className='bg-green-500'>Aceptar</button>
                        <button onClick={() => handleRejectOrder(order.id, order.products, order.sellerId, order.userId)} className='bg-red-500'>Rechazar</button>
                    </div>
                    )}
                    {order.status === 'RECHAZADO' && (
                    <div>
                        <button onClick={() => handleAcceptOrder(order.id, order.products, order.sellerId, order.userId)} className='bg-blue-500'>Aceptar</button>
                    </div>
                    )}
                    {order.status === 'ACEPTADO' && (
                    <div>
                        <button onClick={() => handlePrepareOrder(order.id, order.products, order.sellerId, order.userId)} className='bg-blue-500'>Preparar</button>
                        <button onClick={() => handleRejectOrder(order.id, order.products, order.sellerId, order.userId)} className='bg-red-500'>Cancelar</button>
                    </div>
                    )}
                    {order.status === 'PREPARANDO' && (
                    <div>
                        <button onClick={() => handleCookOrder(order.id, order.products, order.sellerId, order.userId)} className='bg-yellow-500'>Cocinar</button>
                        <button onClick={() => handleRejectOrder(order.id, order.products, order.sellerId, order.userId)} className='bg-red-500'>Cancelar</button>
                    </div>
                    )}
                    {order.status === 'COCINADO' && (
                    <div>
                        <button onClick={() => handleFinishOrder(order.id, order.products, order.sellerId, order.userId)} className='bg-yellow-500'>Pedido listo</button>
                        <button onClick={() => handleRejectOrder(order.id, order.products, order.sellerId, order.userId)} className='bg-red-500'>Cancelar</button>
                    </div>
                    )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center">
              <h1>No hay pedidos</h1>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Orders;
