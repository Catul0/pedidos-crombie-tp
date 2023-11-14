/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

function LocalCard({ local }: { local: any }) {
    return (
      <>
        <Link href={'/sellers/'+local.id}>
          <div className="p-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all duration-300 hover:scale-105">
            <img className="w-full h-32 object-cover object-center rounded-t-lg" src={local.logo} alt="" />
            <div className="px-2 py-1">
              <div className="text-black font-bold text-sm md:text-m">{local.name}</div>
              <div className="flex gap-3 items-center">
                <div className="text-gray-600 text-xs md:text-sm">🕒 42 min</div>
                <div className="text-gray-600 text-xs md:text-sm">🛵 GRATIS</div>
              </div>
            </div>
          </div>
        </Link>
      </>
  );
}

export default LocalCard;
