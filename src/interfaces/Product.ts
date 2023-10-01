export interface Product {
    id: number;
    productName: string;
    description: string;
    price: number;
    image: string;
    sellerId: number;
}

export type CreateProduct = Omit<Product, 'id' | 'sellerId'>;