import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VeterinaryService } from 'lib/services/veterinary.service';
import { VeterinaryView } from 'lib/dtos/veterinaries';

@Component({
  selector: 'veterinary-view',
  templateUrl: './view.component.html'
})
export class VeterinaryViewComponent implements OnInit {
  veterinary!: VeterinaryView;

  constructor(
    private route: ActivatedRoute,
    private veterinaryService: VeterinaryService
  ) {}


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.veterinaryService.getVeterinaryById(id).subscribe({
      next: (data) => this.veterinary = data,
      error: (error) => console.error(error)
    });
  }
}
