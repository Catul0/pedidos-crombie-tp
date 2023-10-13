export interface Vehicle {
    id: number;
    brand: string;
    model: string;
    licensePlate: string;
    vehicleOwner: number;
    color: string;
    year:number;
}
export interface SellersVehicle {
    id?:number
    brand?: string;
    model?: string;
    licensePlate?: string;
    vehicleOwner?:number;
    color?: string;
    year?:number;
}
export type CreateVehicle = Omit<Vehicle, 'id' | 'vehicleOwner'>;