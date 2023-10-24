/* eslint-disable @next/next/no-img-element */
import React, {useState} from 'react';
import { useUsers } from '@/context/UserContext';
import EditUser from './EditUser';
import { useEffect } from 'react';
import { useLogin } from '@/context/LoginContext';
import { useRouter } from 'next/navigation';
import Popup from '../PopUp';
import Link from 'next/link';
import {BsBagPlus} from 'react-icons/Bs'

const UserProfile = ({ params }: { params: { id: string } }) => {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowPopup(false);
    }, 5000); // Oculta el popup después de 5 segundos

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  const { logout } = useLogin();
  const { userProfiles, loaduserProfile, setSelectedUser, selectedUser } = useUsers();
  const id = params.id;
  const user: any = userProfiles;
  const router = useRouter();
  useEffect(() => {
    loaduserProfile(Number(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="flex min-h-screen bg-gray-100">
    {showPopup && <Popup message={`¡Hola ${user.name}!`} />}
      {/* lado izq */}
      <div className="w-1/3 bg-white p-6">
        <div className='bg-white rounded p-5  shadow-lg'>
          <div className="text-center">
            <img
              className="w-16 h-16 rounded-full border-4 border-[#FF9B50] mx-auto"
              src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
              alt="User Profile"
            />
            <h2 className="text-2xl font-semibold text-gray-800">{user.name} {user.lastName}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800">Información de Perfil</h3>
            <ul className="list-disc list-inside mt-3 text-gray-700">
              <li><span className="font-semibold">Phone:</span> {user.phone}</li>
              <li><span className="font-semibold">City:</span> {user.city}</li>
              <li><span className="font-semibold">Address:</span> {user.address}</li>
            </ul>
          </div>
          <div className="mt-6">
            <button className="bg-[#FF9B50] hover:bg-[#A53021] text-white py-2 px-4 rounded-lg w-full"
              onClick={() => {
                if (selectedUser) {
                  setSelectedUser(null)
                } else {
                  setSelectedUser(user)
                }
              }}
            >
              {selectedUser ? "CANCELAR" : "EDITAR PERFIL"}
            </button>
            {selectedUser ? <EditUser /> : <p></p>}
            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg w-full mt-4"
              onClick={() => {

                setTimeout(() => {
                  logout();
                  router.push("http://localhost:3000/login")
                }, 1000)
              }}>
              CERRAR SESIÓN
              {/* esto todavia no anda */}
            </button>
          </div>
        </div>
      </div>

      {/* lado derecho, pedidos */}
      <div className="w-2/3 p-6 flex flex-col items-center bg-white shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800">Historial de Pedidos</h3>
        {user.orders && user.orders.length > 0 ? (
          <ul className="mt-4">
            <li className="mb-4 border border-gray-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold">pizza</h4>
              <p className="text-gray-600">Fecha del Pedido: 2 de noviembre</p>
              {/* completar cuando este lo de orders hecho */}
            </li>
          </ul>
        ) : (
          <div className="flex flex-col items-center">
            <BsBagPlus size={100}/>
            <p className="text-l font-bold text-black mt-4">Aun no has realizado pedidos</p>
            <p className="text-s text-black">Buscá entre todas nuestras opciones y disfruta de tu primer pedido</p>
            <Link href={'/search'}>
            <button className="bg-[#FF9B50] hover:bg-[#A53021] text-white py-2 px-4 rounded-lg mt-4">
              Hacer pedido
            </button>
            </Link>
          </div>
        )}
      </div>
    </div>

  );
};

export default UserProfile;
