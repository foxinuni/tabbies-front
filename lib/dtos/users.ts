export interface UserView {
	id: number;
	document: number;
	name: string;
	email: string;
	number: string;
}

export interface UserUpsert {
	document: number;
	name: string;
	email: string;
	number: string;
	password: string;
}
