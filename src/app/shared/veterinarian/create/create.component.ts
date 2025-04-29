import { Component } from '@angular/core';
import { VeterinaryService } from 'lib/services/veterinary.service';
import { VeterinaryUpsert } from 'lib/dtos/veterinaries';
import { Router } from '@angular/router';

@Component({
  selector: 'veterinary-create',
  templateUrl: './create.component.html'
})
export class VeterinaryCreateComponent {
  veterinary: VeterinaryUpsert = {
    name: '',
    email: '',
    document: 0,
    number: 0,
    role: '',
    specialty: '',
    picture: ''
  };

  constructor(
    private veterinaryService: VeterinaryService,
    private router: Router
  ) {}

  createVeterinary(): void {
    this.veterinaryService.createVeterinary(this.veterinary).subscribe({
      next: () => this.router.navigate(['/veterinaries']),
      error: (error) => console.error(error)
    });
  }
}
