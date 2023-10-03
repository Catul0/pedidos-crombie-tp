import DeliveryProfile from '@/components/Delivery/DeliveryProfile'
import CreateVehicle from '@/components/vehicle/createVehicle'
import React from 'react'

export default function DeliveryProfiles({ params }: { params: { id: string } }) {
  return (
    <>
      <DeliveryProfile params={params} />
      <CreateVehicle params={params} />
    </>
  )
}
