import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VeterinarianService } from 'lib/services/veterinarian.service';
import { VeterinarianView } from 'lib/dtos/veterinarian';

@Component({
  selector: 'veterinary-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  veterinary!: VeterinarianView;

  constructor(
    private route: ActivatedRoute,
    private veterinaryService: VeterinarianService
  ) {}


  public ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.veterinaryService.getVetById(id).subscribe({
      next: (data) => this.veterinary = data,
      error: (error) => console.error(error)
    });
  }
}
