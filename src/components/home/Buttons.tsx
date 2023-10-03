import React from 'react'
import Link from 'next/link'

function Buttons() {
  return (
    <div>
        <Link href="/sellers">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
          Ver Locales y Registrar nuevo local
        </button>
      </Link>
      <Link href="/users/register">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
          Registrar Usuario
        </button>
      </Link>
      <Link href="/deliverys/register">
        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
          Registrar Delivery
        </button>
      </Link>
    </div>
  )
}

export default Buttons