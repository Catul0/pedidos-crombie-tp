export interface Delivery {
    id: number;
    name: string;
    lastName: string;
    rol: string;
    email: string;
    password: string;
}

export type CreateDelivery = Omit<Delivery, 'id'>;