"use client"
import { createContext, useContext, useState } from "react";
import { Delivery, CreateDelivery } from "@/interfaces/Delivery";

interface Children {
    children: React.ReactNode;
}

export const DeliveryContext = createContext<{
    deliverys:Delivery[];
    loadDelivery:()=> Promise<void>;
    createDelivery: (delivery: CreateDelivery) => Promise<void>;
    updateDelivery: (id:number,delivery: Delivery) => Promise<void>;
    deleteDelivery: (id: number) => Promise<void>;
}>({
    deliverys:[],
    loadDelivery:async()=>{},
    createDelivery: async (delivery: CreateDelivery) => { },
    updateDelivery: async (id:number,delivery: Delivery) => { },
    deleteDelivery: async (id: number) => { },
})

export const useDeliverys = () =>{
    const context = useContext(DeliveryContext)
    if (!context){
        throw new Error('useDeliverys must be used whithin a DeliverysProviders')
    }
    return context
}

export const DeliverysProvider = ({ children }: Children) => {
    const [deliverys,setDeliverys] = useState<Delivery[]>([]);

    async function loadDelivery(){
        const res = await fetch("/api/deliverys");
        const data = await res.json();
        setDeliverys(data);
    }

    async function createDelivery(delivery: CreateDelivery){
        const  res = await fetch('/api/deliverys',{
            method:'POST',
            body: JSON.stringify(delivery),
            headers:{
                'content-Type':'application/json'
            }
        })
        const newdelivery = await res.json()
        setDeliverys([...deliverys, newdelivery]);
    }

    async function deleteDelivery(id:number){
        const res = await fetch('/api/deliverys/'+id,{
            method:'DELETE',
        })
        const data = await res.json()
        setDeliverys(deliverys.filter((delivery)=> delivery.id!=id));
    }


    async function updateDelivery(id: number, delivery: Delivery) {
        const res = await fetch('/api/deliverys/' + id,  {
            body: JSON.stringify(delivery),
            method: 'PUT',
            headers: {
                'content-Type': 'application/json'
            }
        })
        const data = await res.json()
        setDeliverys(deliverys.map(delivery => delivery.id === id ? data : delivery));
    }
    return(
    <DeliveryContext.Provider
        value={{
            deliverys,
            loadDelivery,
            createDelivery,
            updateDelivery,
            deleteDelivery,
        }}>{children}
    </DeliveryContext.Provider>
    )
}



// - FALTA HACER LA FUNCION DE LOGIN 