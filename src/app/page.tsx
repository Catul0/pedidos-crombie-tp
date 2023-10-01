"use client"
import Link from "next/link";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Link href="/sellers">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
          Ver Locales y Registrar nuevo local
        </button>
      </Link>
      <Link href="/users/register">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
          Registrar Usuario
        </button>
      </Link>
      <Link href="/deliverys/register">
        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
          Registrar Delivery
        </button>
      </Link>
    </div>
  );
}

export default HomePage;




//ACA SIMPLEMENTE VOY A PROBAR SI PUEDO TRAER LOS DATOS AL FRON CON EL BACKEND 
//QUE TENEMOS HECHO, VOY A PROBAR DE MOSTRAR TODOS LOS NEGOCIOS
//Y QUE HAYA UN BOTON DE "VER PRODUCTOS" Y QUE TE MUESTRE TODOS LOS PRODUCTOS 
//DEL NEGOCIO EN ESPECIFICO