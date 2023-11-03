"use client"
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { useLocalProfiles } from '@/context/LocalProfileContext';
import SellersProducts from './SellersProducts';
import CreateProduct from '../product/CreateProduct';
import EditSeller from './EditSeller';
import Cart from '../cart/Cart';
import BackButton from '../BackButton';
import {GrCart} from 'react-icons/Gr'
import {MdPendingActions} from 'react-icons/Md'
import { useCart } from '@/context/CartContext';
import {BiUserCircle} from 'react-icons/Bi'
import Orders from '../orders/Order';
import { useOrderContext } from '@/context/OrderContext';


export default function SellerProfile({
  params,
  isTrue,
}: {
  params: { id: string };
  isTrue: boolean | null;
}) {
  const id = params.id;
  const { userOrders } = useOrderContext();
  const userOrdersFiltered = userOrders.filter((order: any) => order.sellerId === Number(id));
  const { sellerProfiles, loadSellerProfile, setSelectedSeller, selectedSeller } = useLocalProfiles();
  const seller: any = sellerProfiles;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const {cart} = useCart();
  const [renderedComponent, setRenderedComponent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    // Realiza la carga del perfil del vendedor solo si no se ha cargado previamente o si el ID ha cambiado.
    if (!seller || seller.id !== Number(id)) {
      loadSellerProfile(Number(id));
    }
  }, [id, seller, loadSellerProfile]);

  useEffect(() => {
    // decide qué componente renderizar en función de isTrue
    if (isTrue) {
      setRenderedComponent(<Orders params={params} />);
    } else {
      setRenderedComponent(<Cart />);
    }
  }, [isTrue, params]);

  return (
    <>
    <div className="bg-white h-16 flex items-center justify-between px-10 border-b border-gray-300">
      <BackButton />
      <p className="text-black px-4 py-2 font-semibold">Pedidos Crombie - {seller.name}</p>
      <div className="flex flex-row gap-7 items-center">
        <button>
          <BiUserCircle size={40}/>
        </button>
        <button onClick={() => setIsCartOpen(!isCartOpen)}>
        {cart.length > 0 || userOrdersFiltered.length > 0 && (
              <span
              style={{
                position: 'absolute',
                top: '5px',
                right: '35px',
                backgroundColor: 'green',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
              }}
            >
                {isTrue ? userOrdersFiltered.length : cart.length}
              </span>
        )}
        {isTrue ? <MdPendingActions size={35}/> : <GrCart size={35}/>}
        </button>
      </div>
    </div>

    <div className="flex bg-[#F7F8F9] h-auto py-10">
      <div className="w-1/4 bg-[#F7F8F9]">
        <div className="flex flex-col items-center p-4 text-center bg-white border border-gray-200 ml-5 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <img className="rounded-t-lg px-2 max-w" src={seller.logo} alt="" />
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {seller.name}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{seller.type}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{seller.description}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {seller.address}, {seller.city}, Argentina
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{seller.averageScore}</p>
          </div>
          {isTrue && (
            <button
              className="bg-green-600 text-slate-100 rounded-lg w-1/2 p-2"
              onClick={() => {
                if (selectedSeller) {
                  setSelectedSeller(null);
                } else {
                  setSelectedSeller(seller);
                }
              }}
            >
              {selectedSeller ? "CANCELAR" : "EDITAR PERFIL"}
            </button>
          )}
          {selectedSeller ? <EditSeller /> : <p></p>}
        </div>
      </div>
      {/* productos */}
      <div className="w-2/4">
        <SellersProducts params={params} isTrue={isTrue} />
      </div>
      {/* carrito */}
      {/* ventana emergente del carrito utilizando clases de Tailwind CSS */}
      {isCartOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-100 border w-full h-full border-gray-200 shadow-lg p-4">
            <button
              className="bg-blue-500 text-white rounded-lg p-2"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              X
            </button>
            {renderedComponent}
          </div>
        </div>
      )}
      {/* crear producto */}
      {isTrue && (
        <div className="w-1/4 bg-white">
          <CreateProduct params={params} />
        </div>
      )}
    </div>
    </>
  );
}