import React from "react";
import Image from "next/image";
import BackButton from "../BackButton";
import { IconShoppingCartFilled } from "@tabler/icons-react";

function Navbar(props: any) {
  const { text } = props;
  return (
    <div className="bg-white h-16 flex items-center justify-between px-10 border-b border-gray-300">
      <BackButton />
      <p className="text-black px-4 py-2 font-semibold">{text}</p>
      <div className="flex items-center">
        <IconShoppingCartFilled size={40} />
      </div>
    </div>
  );
}

export default Navbar;
