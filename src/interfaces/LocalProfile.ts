// tuve que separar las interfaces porque cuando quiero crear un perfil
// no puedo mandarle el id desde el form, entonces creo un type que excluye el id y puede crearlo

export interface LocalProfile {
    id: number;
    description: string;
    name: string;
    address: string;
    city: string;
    password: string;
    email: string;
}

export type CreateLocalProfile = Omit<LocalProfile, 'id'>;