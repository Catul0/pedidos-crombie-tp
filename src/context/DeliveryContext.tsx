"use client"
import { createContext, useContext, useState } from "react";
import { Delivery, CreateDelivery } from "@/interfaces/Delivery";

interface Children {
    children: React.ReactNode;
}

export const DeliveryContext = createContext<{
    deliverys:Delivery[];
    deliveryProfile:Delivery[];
    loadDelivery:()=> Promise<void>;
    loadDeliveryProfile:(id:number)=>Promise<void>;
    createDelivery: (delivery: CreateDelivery) => Promise<void>;
    updateDelivery: (id:number,delivery: Delivery) => Promise<void>;
    deleteDelivery: (id: number) => Promise<void>;
}>({
    deliverys:[],
    deliveryProfile:[],
    loadDelivery:async()=>{},
    loadDeliveryProfile:async()=>{},
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
    const [deliveryProfile, setDeiveryProfile] = useState<Delivery[]>([]);
    async function loadDelivery(){
        const res = await fetch("/api/deliverys");
        const data = await res.json();
        setDeliverys(data);
    }

        //ESTO LO QUE HACE ES MOSTRAR SOLO 1 PERFIL DE DELIVERY
        async function loadDeliveryProfile(id: number) {
            try {
                const res = await fetch("/api/deliverys/" + id);
                const data = await res.json();
                setDeiveryProfile(data);           
            } catch (error) {
                console.log(error)
            }
        }
    
    const [delivery, setDelivery] = useState(null)
    const [token, setToken] = useState(null)
    async function createDelivery(delivery: CreateDelivery){
        const  res = await fetch('/api/deliverys',{
            method:'POST',
            body: JSON.stringify(delivery),
            headers:{
                'content-Type':'application/json'
            }
        })
        const data = await res.json();
        const newDelivery = data.user;
        const newToken = data.token;
        setToken(newToken);
        //guarda el token en localstorage
        localStorage.setItem('token', newToken);
        setDelivery(newDelivery);
        setDeliverys([...deliverys, newDelivery]);
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
            loadDeliveryProfile,
            createDelivery,
            updateDelivery,
            deleteDelivery,
            deliveryProfile,
        }}>{children}
    </DeliveryContext.Provider>
    )
}



// - FALTA HACER LA FUNCION DE LOGIN 