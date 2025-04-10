import { Injectable } from '@angular/core';
import { config } from './config';
import { PetUpsert, PetView } from 'lib/dtos/pets';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Pet from 'lib/entities/pet';

@Injectable({
	providedIn: 'root'
})
export class MyPetsService {
	constructor(
		private readonly http: HttpClient
	) {}

	public getAllPets(): Observable<PetView[]> {
		return this.http.get<PetView[]>(`${config.backend_endpoint}/my-pets/`, { withCredentials: true });
	}

	public getPetById(id: number): Observable<PetView> {
		return this.http.get<PetView>(`${config.backend_endpoint}/my-pets/${id}`, { withCredentials: true });
	}
}
