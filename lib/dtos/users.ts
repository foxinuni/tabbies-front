export interface UserGetDTO {
	id: number;
	document: number;
	name: string;
	email: string;
	number: string;
}

export interface UserCreateDTO {
	document: number;
	name: string;
	email: string;
	number: string;
	password: string;
}
