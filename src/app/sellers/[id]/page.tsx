"use client"
import SellerProfile from '@/components/seller/SellerProfile'
import React, { useEffect } from 'react'
import { useState} from 'react';
import { decode } from 'jsonwebtoken';

//ACA SE VA A MOSTRAR EL PERFIL DEL NEGOCIO
export default function SellersProfile({params}:{params:{id:string}} ) {
  const id = params.id;
  //la funcion isTrue nos sirve para verificar si el user es el dueño del perfil
  // y si es, lo va a dejar editar el perfil y gestionar los productos.
  const [isTrue, setisTrue] = useState<boolean|null>(null);

  useEffect(() => {
    const localStorageToken = localStorage.getItem('token');
    //primero se fija si tiene token, si no tiene (en el else), lo setea en false
    if (localStorageToken) {
      // si tiene token, verifica que el id del token sea igual que el id del perfil al que intenta ingresar
      //si no es el mismo id lo va a setear en false y si no esta registrado o sea no hay token tambien
      try {
        const decodedToken: any = decode(localStorageToken);

        if (decodedToken.id === Number(id)) {
          setisTrue(true)
        } else {
          setisTrue(false)
        }
      } catch (error) {
        setisTrue(false)
      }
    } else {
      setisTrue(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SellerProfile  params={params} isTrue={isTrue}/>
  )
}
