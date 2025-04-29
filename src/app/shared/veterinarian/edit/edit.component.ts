import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VeterinaryService } from 'lib/services/veterinary.service';
import { VeterinaryUpsert, VeterinaryView } from 'lib/dtos/veterinaries';

@Component({
  selector: 'veterinary-edit',
  templateUrl: './edit.component.html'
})
export class VeterinaryEditComponent implements OnInit {
  id!: number;
  veterinary!: VeterinaryUpsert;

  constructor(
    private route: ActivatedRoute,
    private veterinaryService: VeterinaryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.veterinaryService.getVeterinaryById(this.id).subscribe({
      next: (data: VeterinaryView) => {
        this.veterinary = { ...data };
      },
      error: (error) => console.error(error)
    });
  }

  updateVeterinary(): void {
    this.veterinaryService.updateVeterinary(this.id, this.veterinary).subscribe({
      next: () => this.router.navigate(['/admin/veterinarians', this.id]),
      error: (error) => console.error(error)
    });
  }
  
}
