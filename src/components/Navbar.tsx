import React from 'react';
import Image from 'next/image';
import BackButton from './BackButton';

function Navbar(props: any) {
  const { text } = props;

  return (
    <div className="bg-white h-16 flex items-center justify-between px-10 border-b shadow-lg hover:shadow-xl transition-shadow">
      <BackButton />
      <p className="text-black px-4 py-2 font-semibold text-lg">{text}</p>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Image alt="logo" src="/Crombie.png" width={50} height={50} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;

