import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from './config';
import { ProcedureUpsert, ProcedureView } from 'lib/dtos/procedure';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {
	constructor(
		private readonly http: HttpClient
	) {}

	public getAllProcedures(): Observable<ProcedureView[]> {
		return this.http.get<ProcedureView[]>(`${config.backend_endpoint}/procedures/`);
	}

	public getProcedureById(id: number): Observable<ProcedureView> {
		return this.http.get<ProcedureView>(`${config.backend_endpoint}/procedures/${id}`);
	}

	public createProcedure(dto: ProcedureUpsert): Observable<ProcedureView> {
		return this.http.post<ProcedureView>(`${config.backend_endpoint}/procedures/`, dto);
	}

	public updateProcedure(id: number, dto: ProcedureUpsert): Observable<ProcedureView> {
		return this.http.put<ProcedureView>(`${config.backend_endpoint}/procedures/${id}`, dto);
	}

	public deleteProcedure(id: number): Observable<void> {
		return this.http.delete<void>(`${config.backend_endpoint}/procedures/${id}`);
	}
	public getProceduresByPetId(petId: number): Observable<ProcedureView[]> {
		return this.http.get<ProcedureView[]>(`${config.backend_endpoint}/procedures?petId=${petId}`);
	}
}
