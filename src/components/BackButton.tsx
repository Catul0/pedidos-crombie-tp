"use client"
import React from 'react'

import { useRouter } from 'next/navigation';
export default function BackButton() {
    const router = useRouter();
    return (
        <p onClick={() => { router.back() }} className="text-black font-semibold cursor-pointer">
            Volver
        </p>
    )
}
