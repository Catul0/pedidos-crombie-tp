"use client"
import React, { useEffect, useState } from 'react';
import DeliveryProfile from '@/components/delivery/DeliveryProfile';
import { decode } from 'jsonwebtoken';
import { useRouter } from 'next/navigation';

export default function DeliveryProfiles({ params }: { params: { id: string } }) {
  const id = params.id;
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const localStorageToken = localStorage.getItem('token');

    //primero se fija si tiene token, si no tiene (en el else), lo manda a registrarse
    if (localStorageToken) {
      // si tiene token, verifica que el id del token sea igual que el id del perfil al que intenta ingresar
      //si no es el mismo id lo va a mandar a registrarse, y si el token da error tambien lo manda a registrarse
      try {
        const decodedToken: any = decode(localStorageToken);

        if (decodedToken.id === Number(id) && decodedToken.rol === 'delivery') {
          setToken(localStorageToken);
        } else {
          router.push('/deliverys/register');
        }
      } catch (error) {
        router.push('/deliverys/register');
      }
    } else {
      router.push('/deliverys/register');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (token) {
    return <DeliveryProfile params={params} />;
  }

  return null;
}