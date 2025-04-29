export interface VeterinarianView {
	id: number;
	name: string;
	email: string;
	document: number;
	number: number;
	role: string;
	speciality: string;
	picture: string;
}

export interface VeterinarianUpsert {
	name: string;
	email: string;
	document: number;
	number: number;
	role: string;
	speciality: string;
	picture: string;
}
