import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from 'lib/entities/user';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { config } from './config';
import { UserGetDTO } from 'lib/dtos/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	getAllUsers(client: HttpClient): Observable<User[]> {
		return client.get<UserGetDTO[]>(`${config.backend_endpoint}/users/`).pipe(
			map((userDTOs: UserGetDTO[]) => userDTOs.map(userDTO => ({
				id: userDTO.id,
				name: userDTO.name,
				email: userDTO.email,
				document: userDTO.document,
				number: userDTO.number,
				hash: '',
			} as User))),

			catchError(error => {
				console.error('Error fetching users:', error);
				return of([]);
			})
		);
	}

	// getUserById
	getUserById(client: HttpClient, id: number): Observable<User | undefined> {
		return client.get<UserGetDTO[]>(`${config.backend_endpoint}/users/`).pipe(
			map((userDTOs: UserGetDTO[]) => {
				const userDTO = userDTOs.find(user => user.id === id);
				return userDTO
					? {
						id: userDTO.id,
						name: userDTO.name,
						email: userDTO.email,
						document: userDTO.document,
						number: userDTO.number,
						hash: '',
					} as User
					: undefined;
			}),

			catchError(error => {
				console.error('Error fetching user by ID:', error);
				return of(undefined);
			})
		);
	}

	// createUser
	createUser(client: HttpClient, user: User): Observable<User> {
		return client.post<User>(`${config.backend_endpoint}/users/`, user).pipe(
			catchError(error => {
				console.error('Error creating user:', error);
				throw error;
			})
		);
	}

	// updateUser
	updateUser(client: HttpClient, id: number, updatedUser: User): Observable<User> {
		return client.put<User>(`${config.backend_endpoint}/users/${id}/`, updatedUser).pipe(
			catchError(error => {
				console.error('Error updating user:', error);
				throw error;
			})
		);
	}

	// deleteUser
	deleteUser(client: HttpClient, id: number): Observable<void> {
		return client.delete<void>(`${config.backend_endpoint}/users/${id}/`).pipe(
			catchError(error => {
				console.error('Error deleting user:', error);
				throw error;
			})
		);
	}
}
