import { Component, OnInit } from '@angular/core';
import { forkJoin, switchMap } from 'rxjs';
import { PetService } from 'lib/services/pet.service';
import { ModelMapper } from 'lib/services/model-mapper.service';
import Pet from 'lib/entities/pet';


@Component({
	selector: 'pet-listing',
	templateUrl: './listing.component.html',
	styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
	public pets: Pet[] = [];

	constructor(
		private readonly petService: PetService,
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

	public toggleStatus(id: number, active: boolean) {
		this.petService.setActive(id, active).subscribe(
			() => {
				this.petService.getAllPets().pipe(
					switchMap(models => {
						const pets = models.map(model => this.modelMapper.petViewToEntity(model));
						return forkJoin(pets);
					})
				).subscribe(pets => {
					this.pets = pets;
				})
			}
		);
	}
}

function collectAll(): import("rxjs").OperatorFunction<import("rxjs").Observable<Pet>, unknown> {
	throw new Error('Function not implemented.');
}

