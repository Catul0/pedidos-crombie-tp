export interface CreateOrder {
    products: [];
    sellerId: number;
    userId: number;
    deliveryId: number | null;
}