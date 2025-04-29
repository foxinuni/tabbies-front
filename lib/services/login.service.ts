import { Injectable } from '@angular/core';
import { config } from './config';
import { PetView } from 'lib/dtos/pets';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	constructor(
		private readonly http: HttpClient
	) {}

	public login(email: string, password: string): Observable<any> {
		return this.http.post<any>(`${config.backend_endpoint}/auth/login`, { email, password }, { withCredentials: true });
	}

	public loginVet(email: string, password: string): Observable<any> {
		return this.http.post<any>(`${config.backend_endpoint}/auth/login-vet`, { email, password }, { withCredentials: true });
	}

	public logout(): Observable<void> {
		return this.http.post<void>(`${config.backend_endpoint}/auth/logout`, {});
	}
}
