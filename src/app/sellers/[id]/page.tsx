"use client"
import SellerProfile from '@/components/seller/SellerProfile'
import React from 'react'


//ACA SE VA A MOSTRAR EL PERFIL DEL NEGOCIO
export default function SellersProfile({params}:{params:{id:string}} ) {
  return (
    <SellerProfile  params={params} />
  )
}
