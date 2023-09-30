"use client"


import { redirect } from "next/navigation";




function HomePage() {

  
  return (
    redirect("/sellers")
  )
}

export default HomePage;



//ACA SIMPLEMENTE VOY A PROBAR SI PUEDO TRAER LOS DATOS AL FRON CON EL BACKEND 
//QUE TENEMOS HECHO, VOY A PROBAR DE MOSTRAR TODOS LOS NEGOCIOS
//Y QUE HAYA UN BOTON DE "VER PRODUCTOS" Y QUE TE MUESTRE TODOS LOS PRODUCTOS 
//DEL NEGOCIO EN ESPECIFICO