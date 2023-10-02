export interface User {
    id: number;
    name: string;
    lastName: string;
    phone: string;
    address: string;
    city: string;
    email: string;
    password: string;
}

export type CreateUser = Omit<User, 'id'>;
export interface UpdateUser {
    name: string;
    lastName: string;
    phone: string;
    address: string;
    city: string;
    email: string;
}