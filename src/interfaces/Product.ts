export interface Product {
    id: number;
    productName: string;
    description: string;
    price: string;
    image: string;
    city: string;
    sellerId: number;
}

export type CreateProduct = Omit<Product, 'id' | 'sellerId'>;