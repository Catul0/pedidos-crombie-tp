"use client"
import React from 'react'
import RegisterDelivery from '@/components/RegisterDelivery'
const DeliverysRegister = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1>Register user as delivery driver</h1>
        <br />
        <RegisterDelivery/>
    </div>
  )
}

export default DeliverysRegister