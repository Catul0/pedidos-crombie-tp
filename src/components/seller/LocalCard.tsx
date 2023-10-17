/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'

function LocalCard({ local }: { local: any }) {
    return (
        <div key={local.id} className='bg-white p-4 my-2 rounded-md flex justify-between w-auto shadow-lg' >
            <div className='h-max max-w-full rounded-lg'>
                {local.logo ? <img src={local.logo} className='h-[100px] m-auto rounded' alt="imagen del negocio" /> : <img src="https://static.vecteezy.com/system/resources/thumbnails/007/126/739/small/question-mark-icon-free-vector.jpg" alt="" />}
                <h2 className='text-2xl font-bold text-black'>{local.name}</h2>
                <p className='text-sm text-gray-600'>{local.description}</p>
                <p className='text-lg font-bold text-black'>{local.averageScore}⭐</p>
                <div className='w-[100%] p-auto flex justify-center '>
                <Link href={'/sellers/'+local.id}>
                    <button  className='bg-[#FF9B50] text-white m-auto rounded-lg  px-4 py-2 mt-4 hover:bg-opacity-80'>Ver Perfil</button>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default LocalCard
