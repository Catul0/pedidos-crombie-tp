import React from 'react';

function Imagen() {
  const imagenUrl = "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  return (
    <div className="flex flex-col justify-center items-center w-full h-[400px] bg-cover bg-center relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full z-[-1] filter blur-sm brightness-100"
        style={{ backgroundImage: `url(${imagenUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      ></div>
      <div className='flex flex-col justify-center items-center text-white text-center p-6 space-y-4'>
        <h1 className="text-4xl font-bold animate-bounce">¡Pedí lo que quieras!</h1>
        <p className="text-2xl font-semibold animate-pulse">Restaurantes, mercados, kioscos, farmacias y mucho más.</p>
        <p className="text-2xl font-semibold animate-pulse">Inicia sesión o regístrate para comenzar</p>
      </div>
    </div>
  );
}

export default Imagen;






