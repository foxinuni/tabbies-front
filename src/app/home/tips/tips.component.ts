import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'home-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class TipsComponent implements OnInit {
  tip: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ tip: string }>('http://localhost:8080/home/cat-tip')
      .subscribe({
        next: response => this.tip = response.tip,
        error: error => console.error('Error al cargar tip:', error)
      });
  }
}
