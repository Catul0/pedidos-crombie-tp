import React from "react";
import BackButton from "./BackButton";
import {IconUserCircle} from '@tabler/icons-react'

function Navbar(props: any) {
  const { text } = props;
  return (
    <div className="bg-white h-16 flex items-center justify-between px-10 border-b shadow-lg">
      <BackButton />
      <p className="text-black px-4 py-2 font-semibold text-base sm:text-lg sm:text-center">{text}</p>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <div className="flex items-center gap-5">
            <IconUserCircle width={50} height={50}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
