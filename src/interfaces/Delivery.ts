export interface Delivery {
    id: number;
    name: string;
    lastName: string;
    rol: string;
    email: string;
    password: string;
}

export interface CreateDelivery {
    name: string;
    lastName: string;
    email: string;
    password: string;
}
