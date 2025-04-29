import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Medicine from 'lib/entities/medicine';

@Component({
  selector: 'medicine-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  medicines: Medicine[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMedicines();
  }

  loadMedicines(): void {
    this.http.get<Medicine[]>('http://localhost:8080/medicines')
      .subscribe({
        next: (data) => {
          this.medicines = data;
        },
        error: (err) => {
          console.error('Error cargando los medicamentos:', err);
        }
      });
  }
}
