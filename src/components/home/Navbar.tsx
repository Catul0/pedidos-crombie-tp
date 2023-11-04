import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Navbar() {
  return (
    <div className='relative'>
    <div className="bg-white fixed top-0 left-0 w-full h-18 flex justify-between items-center p-4 pr-20 pl-20 z-10" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
      <div className="flex items-center">
        <Image alt="logo" src="/Crombie.png" width={50} height={50} />
      </div>
      <div className="space-x-4 font-bold">
        <Link href={"/users/register"}>
            <button className="bg-white text-red-600 px-4 py-2 rounded border border-red-500 transition-all hover:bg-red-500  hover:text-white">
            Registrarse
            </button>
        </Link>
        <Link href={"/login"}>
          <button className="bg-white text-red-600 px-4 py-2 rounded border border-red-500 transition-all hover:bg-red-500 hover:text-white">
            Iniciar sesión
          </button>
        </Link>
      </div>
    </div>
    </div>
  );
}

export default Navbar;
