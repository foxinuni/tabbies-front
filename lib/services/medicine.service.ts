
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from './config';
import { MedicineUpsert, MedicineView } from 'lib/dtos/medicine';

@Injectable({
	providedIn: 'root'
})
export class MedicineService {
	constructor(
		private readonly http: HttpClient
	) {}

	public getAllMedicine(): Observable<MedicineView[]> {
		return this.http.get<MedicineView[]>(`${config.backend_endpoint}/medicines/`, { withCredentials: true });
	}

	public getMedicineById(id: number): Observable<MedicineView> {
		return this.http.get<MedicineView>(`${config.backend_endpoint}/medicines/${id}`, { withCredentials: true });
	}

	public createMedicine(dto: MedicineUpsert): Observable<MedicineView> {
		return this.http.post<MedicineView>(`${config.backend_endpoint}/medicines/`, dto, { withCredentials: true });
	}

	public updateMedicine(id: number, dto: MedicineUpsert): Observable<MedicineView> {
		return this.http.put<MedicineView>(`${config.backend_endpoint}/medicines/${id}`, dto, { withCredentials: true });
	}

	public deleteMedicine(id: number): Observable<void> {
		return this.http.delete<void>(`${config.backend_endpoint}/medicines/${id}`, { withCredentials: true });
	}
}
