"use client"
import React, { useEffect, useState } from 'react';
import UserProfile from '@/components/user/UserProfile';
import { decode } from 'jsonwebtoken';
import { useRouter } from 'next/navigation';

export default function UsersProfile({ params }: { params: { id: string } }) {
  const id = params.id;
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const localStorageToken = localStorage.getItem('token');

    //primero se fija si tiene token, si no tiene (en el else), lo manda a loguearse (ANTES SERA REGISTRARSE, PERO EM PARECE MEJOR QUE TE MANDE A REGISTRARSE)
    if (localStorageToken) {
      // si tiene token, verifica que el id del token sea igual que el id del perfil al que intenta ingresar
      //si no es el mismo id lo va a mandar a Logearse, y si el token da error tambien lo manda a loguearse (ANTES SERA REGISTRARSE, PERO EM PARECE MEJOR QUE TE MANDE A REGISTRARSE)
      try {
        const decodedToken: any = decode(localStorageToken);

        if (decodedToken.id === Number(id) && decodedToken.rol === 'user') {
          setToken(localStorageToken);
        } else {
          router.push('/login');
        }
      } catch (error) {
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (token) {
    return <UserProfile params={params} />;
  }

  return null;
}