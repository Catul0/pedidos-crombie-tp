import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Navbar() {
  return (
    <div className='relative'>
    <div className="bg-white w-full h-18 flex justify-between items-center p-4 pr-20 pl-20 z-10">
      <div className="flex items-cente">
        <Image alt="logo" src="/Crombie.png" width={50} height={50} />
      </div>
      <div className="space-x-4 font-bold">
        <Link href={"/users/register"}>
            <button className="nav-button">
            Registrarse
            </button>
        </Link>
        <Link href={"/login"}>
          <button className="nav-button">
            Iniciar sesión
          </button>
        </Link>
      </div>
    </div>
    </div>
  );
}

export default Navbar;
