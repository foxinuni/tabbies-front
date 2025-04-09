export interface PetGetDTO {
	id: number;
	name: string;
	breed: string;
	weight: number;
	picture: string;
	birthDate: Date;
	ownerId: number;
	isDisabled: boolean;
}

export interface PetCreateDTO {
	name: string;
	breed: string;
	weight: number;
	picture: string;
	birthDate: Date;
	ownerId: number;
	isDisabled?: boolean;
}
