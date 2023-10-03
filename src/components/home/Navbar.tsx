import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Navbar() {
  return (
    <div className="bg-white p-4 pr-20 pl-20 h-16 flex justify-between items-center">
      <div className="flex items-center">
        <Image alt="logo" src="/Crombie.png" width={50} height={50} />
      </div>
      <div className="space-x-4">
        <Link href={"/users/register"}>
            <button className="bg-white text-black px-4 py-2 rounded border border-black transition-all hover:bg-black hover:text-white">
            Registrarse
            </button>
        </Link>
        <button className="bg-white text-black px-4 py-2 rounded border border-black transition-all hover:bg-black hover:text-white">
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}

export default Navbar;
