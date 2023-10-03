"use client"
import React from 'react'
import UserProfile from '@/components/user/UserProfile'

//ACA SE VA A MOSTRAR EL PERFIL DEL USUARIO
export default function UsersProfile({params}:{params:{id:string}} ) {
    return (
      <UserProfile  params={params} />
    )
  }
  