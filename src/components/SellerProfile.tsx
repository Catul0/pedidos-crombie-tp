import React from 'react'
import { LocalProfileContext } from '@/context/LocalProfileContext'
import { LocalProfile } from '@prisma/client'


export default function SellerProfile({ params }: {params: {id: string}} ) {
  return (
    <div>{params.id}</div>
  )
}
