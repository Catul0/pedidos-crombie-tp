export interface User {
	id: number;
	name: string;
	lastName: string;
	phone: string;
	address: string;
	city: string;
	email: string;
	rol: string;
	password: string;
}
export interface CreateUser {
	name: string;
	lastName: string;
	phone: string;
	address: string;
	city: string;
	email: string;
	password: string;
}
export interface UpdateUser {
	name: string;
	lastName: string;
	phone: string;
	address: string;
	city: string;
	email: string;
}
