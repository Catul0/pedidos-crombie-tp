import React from 'react';

function Imagen() {
  const imagenUrl = "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  return (
    <div className="flex flex-col justify-center items-center w-full h-[400px] bg-cover bg-center relative" style={{ backgroundImage: `url(${imagenUrl})` }}>
        <div className='flex flex-col justify-center items-center mb-[30px]'>
            <h1 className="text-white text-4xl font-bold">¡Pedí lo que quieras!</h1>
            <p className="text-white text-1xl font-bold">Restaurantes, mercados, kioscos, farmacias y mucho mas.</p>
        </div>
        <input className="w-[500px] h-[40px] rounded border" type="text" placeholder='Ingresa tu dirección'/>
    </div>
  );
}

export default Imagen;
