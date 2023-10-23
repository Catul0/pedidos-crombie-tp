/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'

function LocalCard({ local }: { local: any }) {
    return (
        <>
        {/* // */}
        <Link href={'/sellers/'+local.id}>
        <div className="w-60 h-50 cursor-pointer overflow-hidden bg-white transition hover:scale-105">
        <img className="w-full h-32 object-cover object-center rounded" src={local.logo} alt="Burritos" />
        <div className="px-2 py-1">
            <div className=" text-black font-bold text-m">{local.name}</div>
            <div className="flex gap-3 items-center">
                <div className="text-gray-600 text-sm">🕒 42 min</div>
                <div className="text-gray-600 text-sm">🛵 GRATIS</div>
            </div>
        </div>
        </div>
        </Link>
        </>
    )
}

export default LocalCard
