import React from 'react'
import RegisterSeller from '@/components/seller/RegisterSeller'
import Navbar from '@/components/Navbar'

function Register() {
  return (
    <div className="h-screen bg-gray-100">
      <Navbar text="Pedidos Crombie - Tu local a domicilio"/>
      <div className="flex flex-col items-center justify-center my-40">
        <RegisterSeller/>
      </div>
    </div>
  )
}

export default Register