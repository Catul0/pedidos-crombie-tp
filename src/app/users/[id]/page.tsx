"use client";
import React from "react";
import UserProfile from "@/components/user/UserProfile";
import Navbar from "@/components/Navbar";

export default function UsersProfile({ params }: { params: { id: string } }) {
  return (
    <div>
      <Navbar text="Tu Perfil" />
      <UserProfile params={params} />
    </div>
  );
}
