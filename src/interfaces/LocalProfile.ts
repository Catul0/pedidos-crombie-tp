// tuve que separar las interfaces porque cuando quiero crear un perfil
// no puedo mandarle el id desde el form, entonces creo un type que excluye el id y puede crearlo

export interface sellerProfile {
    id: number;
    description: string;
    name: string;
    address: string;
    city: string;
    rol: string;
    password: string;
    email: string;
    logo: string;
}

export type CreateLocalProfile = {
    description: string;
    name: string;
    address: string;
    city: string;
    password: string;
    email: string;
    logo?:string;
}

export interface UpdateProfile {
    description?: string;
    name?: string;
    address?: string;
    city?: string;
    logo?:string;
}