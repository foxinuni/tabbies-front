import { Injectable } from '@angular/core';
import { config } from './config';
import { PetView } from 'lib/dtos/pets';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthView } from 'lib/dtos/auth';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	constructor(
		private readonly http: HttpClient
	) {}

	public login(email: string, password: string): Observable<void> {
		return this.http.post<void>(
			`${config.backend_endpoint}/auth/login`,
			{ email, password },
			{ withCredentials: true, responseType: 'text' as 'json' }
		);
	}

	public logout(): Observable<void> {
		return this.http.post<void>(
			`${config.backend_endpoint}/auth/logout`,
			{},
			{ withCredentials: true, responseType: 'text' as 'json' }
		);
	}

	public self(): Observable<AuthView> {
		return this.http.get<AuthView>(`${config.backend_endpoint}/auth/self`, { withCredentials: true });
	}
}
