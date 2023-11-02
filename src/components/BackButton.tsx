"use client"
import React from 'react'
import {IoMdArrowRoundBack} from 'react-icons/Io'
import { useRouter } from 'next/navigation';
export default function BackButton() {
    const router = useRouter();
    return (
        <button onClick={() => { router.back() }} className="gap-2 text-black font-semibold flex flex-row items-center ">
        <IoMdArrowRoundBack/> Volver
        </button>
    )
}