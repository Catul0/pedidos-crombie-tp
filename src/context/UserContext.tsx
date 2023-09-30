"use client"
import { createContext, useContext, useState } from "react";
import { User, CreateUser } from '@/interfaces/User'

interface Children {
    children: React.ReactNode;
}

//ACA ES DONDE SE CREA EL CONTEXTO EN SI Y SE EXPORTAN TODAS LAS FUNCIONES QUE ABAJO DECLARAREMOS EN EL PROVIDER
export const UserContext = createContext<{
    users:User[];
    loadUsers:()=> Promise<void>;
    createUser: (user: CreateUser) => Promise<void>;
    updateUser: (id:number,user: User) => Promise<void>;
    deleteUser: (id: number) => Promise<void>;
}>({
    users:[],
    loadUsers:async()=>{},
    createUser: async (user: CreateUser) => { },
    updateUser: async (id:number,user: User) => { },
    deleteUser: async (id: number) => { },
})

export const useUsers = () =>{
    const context = useContext(UserContext)
    if (!context){
        throw new Error('useUsers must be used whithin a UsersProviders')
    }
    return context
}

export const UsersProvider = ({ children }: Children) => {
    const [users,setUsers] = useState<User[]>([]);

    //ESTA FUNCION TRAE TODOS LOS USUARIOS, NO CREO QUE LA USEMOS PERO PARA PROBAR COSAS FUNCIONA 
    async function loadUsers(){
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
    }

    //esta funcion lo que hace es crear un nuevo usuario, y ademas agrega al estado donde estan todos los usuarios el nuevo
    //despues uno tiene que mostrar el estado ese nomas y se muestra actualizado
    async function createUser(user: CreateUser){
        const res = await fetch('/api/users',{
            method:'POST',
            body: JSON.stringify(user),
            headers:{
                'content-Type':'application/json'
            }
        })
        const newUser = await res.json()
        setUsers([...users, newUser]);
    }

    //esta funcion es para eliminar y elimina del estado el usuario eliminado
    async function deleteUser(id:number){
        const res = await fetch('/api/users/'+id,{
            method:'DELETE',
        })
        const data = await res.json()
        setUsers(users.filter((user)=> user.id!=id));
    }


    //esta funcion es para actualizar la informacion de un usuario
    async function updateUser(id: number, user: User) {
        const res = await fetch('/api/users/' + id,  {
            body: JSON.stringify(user),
            method: 'PUT',
            headers: {
                'content-Type': 'application/json'
            }
        })
        const data = await res.json()
        setUsers(users.map(user => user.id === id ? data : user));
    }
    return(
    <UserContext.Provider
        value={{
            users,
            loadUsers,
            createUser,
            updateUser,
            deleteUser,
        }}>{children}
    </UserContext.Provider>
    )
}


//DEJO ESTE COMENTARIO ACA POR LAS DUDAS DESPUES, PUEDE LLEGAR A HABER PROBLEMAS LUEGO, CUNADO SE USEN ESTAS FUNCIONES
//POR QUE EN TODAS LAS FUNCIONES USO QUE LOS OBJEROS SEAN TIPO USER (EL USER CREADO EN EL ESQUEMA) Y ESO PUEDE LLEGAR 
//A TRAER PROBLEMAS LUEGO, POR QUE NO SIEMPRE VAMOS A NECESITAR TODOS LOS DATOS DE USER

// - FALTA HACER LA FUNCION DE LOGIN 