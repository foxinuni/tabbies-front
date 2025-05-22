import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
		return this.http.get<UserView[]>(`${config.backend_endpoint}/users/`, { withCredentials: true });
	}

	public getUserById(id: number): Observable<UserView> {
		return this.http.get<UserView>(`${config.backend_endpoint}/users/${id}`, { withCredentials: true });
	}

	public createUser(dto: UserUpsert): Observable<UserView> {
		return this.http.post<UserView>(`${config.backend_endpoint}/users/`, dto, { withCredentials: true });
	}

	public updateUser(id: number, dto: UserUpsert): Observable<UserView> {
		return this.http.put<UserView>(`${config.backend_endpoint}/users/${id}`, dto, { withCredentials: true });
	}

	public deleteUser(id: number): Observable<void> {
		return this.http.delete<void>(`${config.backend_endpoint}/users/${id}`, { withCredentials: true });
	}
}
