"use client"
import React from 'react'
import UserProfile from '@/components/user/UserProfile'
import { decode } from 'jsonwebtoken';
import { useRouter } from 'next/navigation';

//ACA SE VA A MOSTRAR EL PERFIL DEL USUARIO
export default function UsersProfile({params}:{params:{id:string}} ) {
  const id = params.id;
  const router = useRouter()

  // saca el token de localstorage
  const token = localStorage.getItem('token');

    // verifica si el token existe y si es validp
    if (token) {
      try {
        const decodedToken: any = decode(token);

        // compara el id del token con el numero en params
        if (decodedToken.id === Number(id)) {
          return (
            <UserProfile  params={params} />
          )
        } else {          
          router.push('/users/register')
        }
      } catch (error) {
        router.push('/users/register')
      }
    } else {
      router.push('/users/register')
    }
}
  