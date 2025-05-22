import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from './config';
import { VeterinarianUpsert, VeterinarianView } from 'lib/dtos/veterinarian';

@Injectable({
  providedIn: 'root'
})
export class VeterinarianService {
	constructor(
		private readonly http: HttpClient
	) {}

	public getAllVets(): Observable<VeterinarianView[]> {
		return this.http.get<VeterinarianView[]>(`${config.backend_endpoint}/veterinarians/`, { withCredentials: true });
	}

	public getVetById(id: number): Observable<VeterinarianView> {
		return this.http.get<VeterinarianView>(`${config.backend_endpoint}/veterinarians/${id}`, { withCredentials: true });
	}

	public createVet(dto: VeterinarianUpsert): Observable<VeterinarianView> {
		return this.http.post<VeterinarianView>(`${config.backend_endpoint}/veterinarians/`, dto, { withCredentials: true });
	}

	public updateVet(id: number, dto: VeterinarianUpsert): Observable<VeterinarianView> {
		return this.http.put<VeterinarianView>(`${config.backend_endpoint}/veterinarians/${id}`, dto, { withCredentials: true });
	}

	public deleteVet(id: number): Observable<void> {
		return this.http.delete<void>(`${config.backend_endpoint}/veterinarians/${id}`, { withCredentials: true });
	}

	public getSelf(): Observable<VeterinarianView> {
		return this.http.get<VeterinarianView>(`${config.backend_endpoint}/veterinarians/@me`, { withCredentials: true });
	}
}
