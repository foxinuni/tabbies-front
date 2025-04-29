import { Component } from '@angular/core';
import { VeterinarianService } from 'lib/services/veterinarian.service';
import { VeterinarianUpsert } from 'lib/dtos/veterinarian';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelMapper } from 'lib/services/model-mapper.service';
import { getPathForContext } from 'src/app/app-routing.module';
import Veterinary from 'lib/entities/veterinary';
import { switchMap } from 'rxjs';

@Component({
  selector: 'veterinary-create',
  templateUrl: './create.component.html'
})
export class CreateComponent {
  public veterinary: Veterinary = {
	id: 0,
    name: '',
    email: '',
    document: 0,
    number: 0,
    role: '',
    speciality: '',
    picture: ''
  };

  constructor(
	private readonly router: Router,
	private readonly route: ActivatedRoute,
    private readonly veterinaryService: VeterinarianService,
	private readonly modelMapper: ModelMapper,
  ) {}

  public createVeterinary(): void {
	const { context } = this.route.snapshot.data;
	const path = getPathForContext(context);

    this.modelMapper.vetEntityToUpsert(this.veterinary).pipe(
		switchMap(dto => this.veterinaryService.createVet(dto))
	).subscribe(() => {
		this.router.navigate([path, 'veterinarians']);
	});
  }
}
