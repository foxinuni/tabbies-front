import { Injectable } from '@angular/core';
import User from 'lib/entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	private Users: User[]= [
		{
			id: 1,
			document: 123456789,
			name: "Emilio",
			email: "emilio@gmail.com",
			hash: "emilio",
			number: "3206214141"
		},
		{
			id: 2,
			document : 987654321,
			name: "Alfredo",
			email: "alfredo@gmail.com",
			hash: "alfredo",
			number: "321623232"
		},
		{
			id: 3,
			document: 345234214,
			name: "Miguel",
			email: "miguel@gmail.com",
			hash: "miguel",
			number:"313231321"
		}
	]

	//getAllUsers
	getAllUsers(): User[] {
		return this.Users;
	}
	//getUserById
	getUserById(id: number): User | undefined {
		return this.Users.find(user => user.id === id);
	}
	//createUser
	createUser(user: User): void {
		this.Users.push(user);
	}
	//updateUser
	updateUser(id: number, updatedUser: User): void {
		const index = this.Users.findIndex(user => user.id === id);
		if (index !== -1) {
			this.Users[index] = updatedUser;
		}
	}
	//deleteUser
	deleteUser(id: number): void {
		this.Users = this.Users.filter(user => user.id !== id);
	}
  constructor() { }
}
