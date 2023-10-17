"use client"
import React, { useEffect, useState } from 'react';
import DeliveryProfile from '@/components/delivery/DeliveryProfile';
import { decode } from 'jsonwebtoken';
import { useRouter } from 'next/navigation';

export default function DeliveryProfiles({ params }: { params: { id: string } }) {

    return <DeliveryProfile params={params} />;

}