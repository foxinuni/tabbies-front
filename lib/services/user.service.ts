import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from 'lib/entities/user';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { config } from './config';
import { UserUpsert, UserView } from 'lib/dtos/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	constructor(
		private readonly http: HttpClient
	) {}

	public getAllUsers(): Observable<UserView[]> {
		return this.http.get<UserView[]>(`${config.backend_endpoint}/users/`);
	}

	public getUserById(id: number): Observable<UserView> {
		return this.http.get<UserView>(`${config.backend_endpoint}/users/${id}`);
	}

	public createUser(dto: UserUpsert): Observable<UserView> {
		return this.http.post<User>(`${config.backend_endpoint}/users/`, dto);
	}

	public updateUser(id: number, dto: UserUpsert): Observable<UserView> {
		return this.http.put<User>(`${config.backend_endpoint}/users/${id}`, dto);
	}

	public deleteUser(id: number): Observable<void> {
		return this.http.delete<void>(`${config.backend_endpoint}/users/${id}`);
	}
}
