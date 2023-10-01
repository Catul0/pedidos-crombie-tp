"use client"
import SellersProducts from '@/components/SellersProducts'
import React from 'react'

//DE MOMENTO ESTA RUTA NO SE USA
const SellersProduct = ({params}:{params:{id:string}} ) => {
  return (
    <SellersProducts params={params} />
  )
}

export default SellersProduct