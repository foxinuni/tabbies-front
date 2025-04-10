export interface PetView {
	id: number;
	name: string;
	breed: string;
	weight: number;
	picture: string;
	birthDate: Date;
	ownerId: number;
	disabled: boolean;
}

export interface PetUpsert {
	name: string;
	breed: string;
	weight: number;
	picture: string;
	birthDate: Date;
	ownerId: number;
	disabled: boolean;
}
