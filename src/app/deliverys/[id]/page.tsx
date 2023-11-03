import React from 'react';
import DeliveryProfile from '@/components/Delivery/DeliveryProfile';

export default function DeliveryProfiles({ params }: { params: { id: string } }) {

    return <DeliveryProfile params={params} />;
}