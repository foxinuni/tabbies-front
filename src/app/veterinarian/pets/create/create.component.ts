import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { PetService } from 'lib/services/pet.service';
import { UserService } from 'lib/services/user.service';
import { ModelMapper } from 'lib/services/model-mapper.service';
import Pet from 'lib/entities/pet';
import User from 'lib/entities/user';
import { forkJoin, switchMap } from 'rxjs';

@Component({
	selector: 'pet-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.css']
})
export class CreateComponent {
	public pet: Pet = {
		id: 0,
		name: '',
		breed: '',
		weight: 0,
		picture: '',
		birthDate: new Date(),
		disabled: false,
	};

	public users: User[] = [];

	constructor(
		private router: Router,
		private userService: UserService,
		private petService: PetService,
		private modelMapper: ModelMapper,
	) {}

	public ngOnInit() {
		this.userService.getAllUsers().pipe(
			switchMap(models => {
				const users = models.map(model => this.modelMapper.userViewToEntity(model));
				return forkJoin(users);
			})
		).subscribe(users => {
			this.users = users;
		});
	}

	public createPet() {
		this.modelMapper.petEntityToUpsert(this.pet).pipe(
			switchMap(dto => this.petService.createPet(dto))
		).subscribe(() => {
			this.router.navigate(['/veterinarian/pets']);
		})
	}
}
