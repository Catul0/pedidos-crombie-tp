import React from 'react'
import { LocalProfile } from '@prisma/client'
import Link from 'next/link'


function LocalCard({ local }: { local: LocalProfile }) {
    return (
        <div key={local.id} className='bg-slate-400 p-4 my-2 rounded-md flex justify-between w-auto' >
            <div className='h-max max-w-full rounded-lg'>
                {local.logo ? <img src={local.logo} className='h-[100px] m-auto' alt="imagen del negocio" /> : <img src="https://static.vecteezy.com/system/resources/thumbnails/007/126/739/small/question-mark-icon-free-vector.jpg" alt="" />}
                <h2>{local.name}</h2>
                <p>{local.description}</p>
                <p>{local.averageScore}</p>
                <Link href={'/sellers/products/'+local.id}>
                    <button  className='bg-slate-900 text-slate-100 rounded-lg'>VER PRODUCTOS</button>
                </Link>

            </div>
        </div>
    )
}

export default LocalCard