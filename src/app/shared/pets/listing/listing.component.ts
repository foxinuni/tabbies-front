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
	public searchTerm: string = '';

	constructor(
		private readonly petService: PetService,
		private readonly modelMapper: ModelMapper,
	) { }

	public ngOnInit() {
		this.searchPets();
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

	public searchPets() {
		if (this.searchTerm) {
			this.pets = this.pets.filter(pet => pet.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
		} else {
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

	public addProcedure(petId: number) {
		
	}
}
