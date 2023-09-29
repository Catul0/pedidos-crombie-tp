"use client"
import LocalCard from "@/components/LocalCard";
import {useLocalProfiles } from "@/context/LocalProfileContext";
import {useEffect} from 'react'



function HomePage() {

  const {localProfiles, loadLocalProfile}= useLocalProfiles();

  useEffect(()=>{
    loadLocalProfile();
  },[])

  return (
    <div className='flex items-center justify-center bg-slate-900'>
      <div>
          <h1 className="text-white">ACA ESTAN LOS VENDEDORES</h1>
        {localProfiles.map(local => (
          <LocalCard local={local} key={local.id}/>
        ))
        }
      </div>
    </div>
  )
}

export default HomePage;



//ACA SIMPLEMENTE VOY A PROBAR SI PUEDO TRAER LOS DATOS AL FRON CON EL BACKEND 
//QUE TENEMOS HECHO, VOY A PROBAR DE MOSTRAR TODOS LOS NEGOCIOS
//Y QUE HAYA UN BOTON DE "VER PRODUCTOS" Y QUE TE MUESTRE TODOS LOS PRODUCTOS 
//DEL NEGOCIO EN ESPECIFICO