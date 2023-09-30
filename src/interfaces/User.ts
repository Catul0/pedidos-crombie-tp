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