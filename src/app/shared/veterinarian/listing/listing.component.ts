import { Component, OnInit } from '@angular/core';
import { VeterinaryView } from 'lib/dtos/veterinaries';
import { VeterinaryService } from 'lib/services/veterinary.service';

@Component({
  selector: 'veterinary-list',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})

export class VeterinaryListComponent implements OnInit {
  veterinaries: VeterinaryView[] = [];

  constructor(private veterinaryService: VeterinaryService) {}

  ngOnInit(): void {
    this.loadVeterinaries();
  }

  loadVeterinaries(): void {
    this.veterinaryService.getAllVeterinaries().subscribe({
      next: (data) => this.veterinaries = data,
      error: (error) => console.error(error)
    });
  }

  deleteVeterinary(id: number): void {
    if (confirm('¿Estás seguro que deseas eliminar este veterinario?')) {
      this.veterinaryService.deleteVeterinary(id).subscribe({
        next: () => this.loadVeterinaries(),
        error: (error) => console.error(error)
      });
    }
  }
}
