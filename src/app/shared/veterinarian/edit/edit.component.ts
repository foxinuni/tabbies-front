import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VeterinarianService } from 'lib/services/veterinarian.service';
import { VeterinarianUpsert, VeterinarianView } from 'lib/dtos/veterinarian';
import { getPathForContext } from 'src/app/app-routing.module';
import { ModelMapper } from 'lib/services/model-mapper.service';
import Veterinary from 'lib/entities/veterinary';
import { switchMap } from 'rxjs';

@Component({
	selector: 'veterinary-edit',
	templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
	id!: number;
	veterinary!: Veterinary;

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly veterinaryService: VeterinarianService,
		private readonly modelMapper: ModelMapper,
	) {}

	public ngOnInit(): void {
		this.id = Number(this.route.snapshot.paramMap.get('id'));
		this.veterinaryService.getVetById(this.id).subscribe({
			next: (data: VeterinarianView) => {
				this.veterinary = { ...data };
			},
			error: (error) => console.error(error),
		});
	}

	public updateVeterinary(): void {
		const { context } = this.route.snapshot.data;
		const path = getPathForContext(context);

		if (this.veterinary) {
			this.modelMapper.vetEntityToUpsert(this.veterinary).pipe(
				switchMap((dto: VeterinarianUpsert) =>
					this.veterinaryService.updateVet(this.veterinary.id, dto),
				),
			).subscribe(() => {
				this.router.navigate([path, 'veterinarians', this.veterinary.id]);
			});
		}
	}
}
