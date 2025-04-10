import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { PetService } from 'lib/services/pet.service';
import { ModelMapper } from 'lib/services/model-mapper.service';
import Pet from 'lib/entities/pet';

@Component({
	selector: 'pet-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.css']
})
export class ViewComponent {
	public pet: Pet | undefined;

	constructor(
		private readonly route: ActivatedRoute,
		private readonly petService: PetService,
		private readonly modelMapper: ModelMapper
	) { }

	public ngOnInit() {
		const id = Number(this.route.snapshot.paramMap.get('id'));

		this.petService.getPetById(id).pipe(
			switchMap(model => this.modelMapper.petViewToEntity(model))
		).subscribe(pet => {
			this.pet = pet
		})
	}
}
