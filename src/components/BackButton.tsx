"use client";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center space-x-2 text-black hover:text-green-400 font-semibold transition-transform transform hover:scale-105 focus:outline-none"
    >
      <IoMdArrowRoundBack className="text-2xl" />
      <span>Volver</span>
    </button>
  );
}
