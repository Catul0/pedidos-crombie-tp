import DeliveryProfile from '@/components/Delivery/DeliveryProfile'
import React from 'react'

export default function DeliveryProfiles({params}:{params:{id:string}}) {
  return (
    <DeliveryProfile params={params} />
  )
}
