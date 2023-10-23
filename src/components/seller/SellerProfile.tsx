/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { useLocalProfiles } from '@/context/LocalProfileContext';
import SellersProducts from './SellersProducts';
import CreateProduct from '../product/CreateProduct';
import EditSeller from './EditSeller';
import Navbar from '../Navbar';
import Cart from '../cart/Cart';

export default function SellerProfile({
  params,
  isTrue,
}: {
  params: { id: string };
  isTrue: boolean | null;
}) {
  const { sellerProfiles, loadSellerProfile, setSelectedSeller, selectedSeller } = useLocalProfiles();
  const id = params.id;
  const seller: any = sellerProfiles;
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    loadSellerProfile(Number(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seller]);

  return (
    <>
    <Navbar text={`Pedidos Crombie - ${seller.name}`}></Navbar>

    <div className="flex bg-white h-screen py-10">
      <div className="w-1/4 bg-white">
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
      <button
        className="bg-blue-500 text-white rounded-lg p-2 w-30 h-10"
        onClick={() => setIsCartOpen(!isCartOpen)}
      >
        Mostrar Carrito
      </button>
      {/* ventana emergente del carrito utilizando clases de Tailwind CSS */}
      {isCartOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
              <button
            className="bg-blue-500 text-white rounded-lg p-2"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            X
          </button>
            <Cart/>
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
