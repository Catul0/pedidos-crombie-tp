/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { LocalProfile } from '@prisma/client'
import Link from 'next/link'


function LocalCard({ local }: { local: any }) {
    return (
        <div key={local.id} className='bg-slate-400 p-4 my-2 rounded-md flex justify-between w-auto' >
            <div className='h-max max-w-full rounded-lg'>
                {local.logo ? <img src={local.logo} className='h-[100px] m-auto' alt="imagen del negocio" /> : <img src="https://static.vecteezy.com/system/resources/thumbnails/007/126/739/small/question-mark-icon-free-vector.jpg" alt="" />}
                <h2>{local.name}</h2>
                <p>{local.description}</p>
                <p>{local.averageScore}⭐</p>
                <div className='w-[100%] p-auto flex justify-center '>
                <Link href={'/sellers/'+local.id}>
                    <button  className='bg-slate-900 text-slate-100 m-auto rounded-lg  px-4'>Ver Perfil</button>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default LocalCard