import { Component, OnInit } from '@angular/core';
import { VeterinarianService } from 'lib/services/veterinarian.service';
import Veterinary from 'lib/entities/veterinary';
import { ModelMapper } from 'lib/services/model-mapper.service';

@Component({
  selector: 'veterinary-list',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})

export class ListingComponent implements OnInit {
  veterinaries: Veterinary[] = [];

  constructor(
	private readonly veterinaryService: VeterinarianService,
	private readonly modelMapper: ModelMapper,
) {}

  ngOnInit(): void {
    this.loadVeterinaries();
  }

  loadVeterinaries(): void {
    this.veterinaryService.getAllVets().subscribe({
      next: (data) => this.veterinaries = data,
      error: (error) => console.error(error)
    });
  }

  deleteVeterinary(id: number): void {
    if (confirm('¿Estás seguro que deseas eliminar este veterinario?')) {
      this.veterinaryService.deleteVet(id).subscribe({
        next: () => this.loadVeterinaries(),
        error: (error) => console.error(error)
      });
    }
  }
}
