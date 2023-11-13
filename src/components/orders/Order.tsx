import React from 'react';
import { useOrderContext } from '@/context/OrderContext';
import ProductsUser from '../product/ProductsUser';
import ProductsOrder from '../product/ProductsOrder';

function Orders({params}: {params: { id: string };}) {
  const id = params.id
  const { userOrders, isLoading, handleAcceptOrder, handleRejectOrder, handlePrepareOrder, handleCookOrder } = useOrderContext();
  const userOrdersFiltered = [...userOrders].filter((order: any) => order.sellerId === Number(id)).reverse();
  return (
    <div className="text-center bg-gray-100 p-4 rounded-lg">
      <h2 className="text-gray-800 text-2xl font-bold mb-4">
        <b>Ordenes actuales</b>
      </h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {userOrders.length > 0 ? (
            <ul className="mt-4">
              {userOrdersFiltered.map((order) => (
                <li key={order.id} className="mb-4 border border-gray-200 rounded-lg p-4">
                  <h4>
                    {new Date(order.orderDate).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })} - {new Date(order.orderDate).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                  </h4>
                  <ProductsOrder productsOrder={order.products} idSeller={order.sellerId} />
                  {order.status === 'PENDIENTE' && (
                    <div>
                        <h4 className="text-lg font-semibold">Nuevo pedido!</h4>
                        <button onClick={() => handleAcceptOrder(order.id, order.products, order.sellerId, order.userId)} className='text-white p-2 bg-green-500 rounded-md m-2'>Aceptar</button>
                        <button onClick={() => handleRejectOrder(order.id, order.products, order.sellerId, order.userId)} className='text-white p-2 bg-red-500 rounded-md m-2'>Rechazar</button>
                    </div>
                  )}
                  {order.status === "RECHAZADO" && (
                    <div>
                        <h4 className="text-lg font-semibold">Rechazaste este pedido</h4>
                        <button onClick={() => handleAcceptOrder(order.id, order.products, order.sellerId, order.userId)} className='text-white p-2 bg-blue-500 rounded-md m-2'>Aceptar</button>
                    </div>
                  )}
                  {order.status === "ACEPTADO" && (
                    <div>
                        <h4 className="text-lg font-semibold">Pedido pendiente de preparación</h4>
                        <button onClick={() => handlePrepareOrder(order.id, order.products, order.sellerId, order.userId)} className='text-white p-2 bg-blue-500 rounded-md m-2'>Preparar</button>
                        <button onClick={() => handleRejectOrder(order.id, order.products, order.sellerId, order.userId)} className='text-white p-2 bg-red-500 rounded-md m-2'>Cancelar</button>
                    </div>
                  )}
                  {order.status === "PREPARANDO" && (
                    <div>
                        <h4 className="text-lg font-semibold">Preparando pedido</h4>
                        <button onClick={() => handleCookOrder(order.id, order.products, order.sellerId, order.userId)} className='text-white p-2 bg-yellow-500 rounded-md m-2'>Listo para retirar</button>
                        <button onClick={() => handleRejectOrder(order.id, order.products, order.sellerId, order.userId)} className='text-white p-2 bg-red-500 rounded-md m-2'>Cancelar</button>
                    </div>
                    )}
                    {order.status === 'COCINADO' && (
                    <div>
                        <h4 className="text-lg font-semibold">Esperando al repartidor</h4>
                    </div>
                    )}
                    {order.status === 'FINALIZADO' && (
                    <div>
                        <h4 className="text-lg font-semibold">Entregado</h4>
                    </div>
                    )}
                    {order.status === 'EN_CAMINO' && (
                    <div>
                        <h4 className="text-lg font-semibold">En camino. A cargo del repartidor.</h4>
                    </div>
                    )}
                    {order.status === 'ENTREGADO' && (
                    <div>
                        <h4 className="text-lg font-semibold">Entregado</h4>
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
