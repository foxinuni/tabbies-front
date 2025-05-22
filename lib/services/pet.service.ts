import { Injectable } from '@angular/core';
import { config } from './config';
import { PetUpsert, PetView } from 'lib/dtos/pets';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Pet from 'lib/entities/pet';

@Injectable({
	providedIn: 'root'
})
export class PetService {
	constructor(
		private readonly http: HttpClient
	) {}

	public getAllPets(): Observable<PetView[]> {
		return this.http.get<PetView[]>(`${config.backend_endpoint}/pets/`, { withCredentials: true });
	}

	public getPetById(id: number): Observable<PetView> {
		return this.http.get<PetView>(`${config.backend_endpoint}/pets/${id}`, { withCredentials: true });
	}

	public createPet(dto: PetUpsert): Observable<PetView> {
		return this.http.post<PetView>(`${config.backend_endpoint}/pets/`, dto, { withCredentials: true });
	}

	public updatePet(id: number, dto: PetUpsert): Observable<Pet> {
		return this.http.put<Pet>(`${config.backend_endpoint}/pets/${id}`, dto, { withCredentials: true });
	}

	public deletePet(id: number): Observable<void> {
		return this.http.delete<void>(`${config.backend_endpoint}/pets/${id}`, { withCredentials: true });
	}

	public setActive(id: number, active: boolean): Observable<PetView> {
		return this.http.post<PetView>(`${config.backend_endpoint}/pets/${id}/status?active=${active}`, {}, { withCredentials: true });
	}
}
