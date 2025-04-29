import { Component, OnInit } from '@angular/core';
import { forkJoin, switchMap } from 'rxjs';
import { MyPetsService } from 'lib/services/my-pets.service';
import { ModelMapper } from 'lib/services/model-mapper.service';
import Pet from 'lib/entities/pet';

@Component({
	selector: 'my-pets-listing',
	templateUrl: './listing.component.html',
	styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
	public pets: Pet[] = [];

	constructor(
		private readonly petService: MyPetsService,
		private readonly modelMapper: ModelMapper,
	) { }

	public ngOnInit() {
		this.petService.getAllPets().pipe(
			switchMap(models => {
				const pets = models.map(model => this.modelMapper.petViewToEntity(model));
				return forkJoin(pets);
			})
		).subscribe(pets => {
			this.pets = pets;
		})
	}
}
