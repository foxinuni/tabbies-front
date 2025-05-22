import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'home-treatment-counter',
  templateUrl: './treatment-counter.component.html',
  styleUrls: ['./treatment-counter.component.css']
})
export class TreatmentCounterComponent implements OnInit {
  count: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ count: number }>('http://localhost:8080/home/treated-cats-count')
      .subscribe({
        next: response => this.count = response.count,
        error: error => console.error('Error al cargar cantidad de tratamientos:', error)
      });
  }
}
