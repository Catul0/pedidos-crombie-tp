"use client"
import { createContext, useContext, useState } from "react";
import { Vehicle } from "@prisma/client";
import { CreateVehicle } from "@/interfaces/Vehicle";
import { Console } from "console";
interface Children {
    children: React.ReactNode;
}

//ACA ES DONDE SE CREA EL CONTEXTO EN SI Y SE EXPORTAN TODAS LAS FUNCIONES QUE ABAJO DECLARAREMOS EN EL PROVIDER
export const VehicleContext = createContext<{
    vehicles: Vehicle[];
    loadVehicles: () => Promise<void>;
    createVehicle: (vehicle: Vehicle, id: number) => Promise<void>;
    updateVehicle: (id: number, vehicle: CreateVehicle) => Promise<void>;
    loadSellerVehicles: (id: number) => Promise<void>;
    deleteVehicle: (id: number) => Promise<void>;
    selectedVehicle: Vehicle | null;
    setSelectedVehicle: (vehicle: Vehicle | null) => void;
}>({
    vehicles: [],
    loadVehicles: async () => { },
    createVehicle: async (vehicle: Vehicle, id: number) => { },
    updateVehicle: async (id: number, vehicle: CreateVehicle) => { },
    loadSellerVehicles: async (id: number) => { },
    deleteVehicle: async (id: number) => { },
    selectedVehicle: null,
    setSelectedVehicle: (vehicle: Vehicle | null) => { }
})

export const useVehicles = () => {
    const context = useContext(VehicleContext)
    if (!context) {
        throw new Error('useVehicles must be used whithin a VehiclesProviders')
    }
    return context
}

export const VehiclesProvider = ({ children }: Children) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    async function loadVehicles() {

        const res = await fetch("/api/vehicle");
        const data = await res.json();
        setVehicles(data);

    }

    //funcion para cargar los vehicleos de 1 vendedor-----------------------------------------------------------------------------------------------------
    async function loadSellerVehicles(id: number) {
        try {
            const res = await fetch("/api/vehicle/" + id);
            const data = await res.json();
            setVehicles(data);
        } catch (error) {
            console.log(error)
        }

    }


    //esta funcion lo que hace es crear un nuevo vehicleo, y ademas agrega al estado donde estan todos los vehicleos el nuevo
    //despues uno tiene que mostrar el estado ese nomas y se muestra actualizado
    async function createVehicle(vehicle: Vehicle, delivery_id: number) {
        vehicle.vehicleOwner = delivery_id;
        const res = await fetch('/api/vehicle', {
            method: 'POST',
            body: JSON.stringify(vehicle),
            headers: {
                'content-Type': 'application/json'
            }
        })

        const newVehicle: Vehicle = await res.json()
        setVehicles([...vehicles, newVehicle]);

    }

    //esta funcion es para eliminar y elimina del estado el vehicleo eliminado
    async function deleteVehicle(id: number) {
        console.log("entra a la funcion eliminar")
        const res = await fetch('/api/vehicle/' + id, {
            method: 'DELETE',
        })
        const data = await res.json()
        setVehicles(vehicles.filter((vehicle) => vehicle.id != id));
    }


    //esta funcion es para actualizar la informacion de un vehicleo
    async function updateVehicle(id: number, vehicle: CreateVehicle) {
        const res = await fetch('/api/vehicle/' + id, {
            body: JSON.stringify(vehicle),
            method: 'PUT',
            headers: {
                'content-Type': 'application/json'
            }
        })
        const data = await res.json()
        setVehicles(vehicles.map(vehicle => vehicle.id === id ? data : vehicle));
    }
    return (
        <VehicleContext.Provider
            value={{
                vehicles,
                loadVehicles,
                createVehicle,
                updateVehicle,
                deleteVehicle,
                loadSellerVehicles,
                selectedVehicle,
                setSelectedVehicle
            }}>{children}
        </VehicleContext.Provider>
    )
}
