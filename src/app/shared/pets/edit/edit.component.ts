import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { PetService } from 'lib/services/pet.service';
import { UserService } from 'lib/services/user.service';
import { ModelMapper } from 'lib/services/model-mapper.service';
import Pet from 'lib/entities/pet';
import User from 'lib/entities/user';
import { getPathForContext } from 'src/app/app-routing.module';

@Component({
	selector: 'pet-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css']
})
export class EditComponent {
	public pet?: Pet;
	public users: User[] = [];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private petService: PetService,
		private userService: UserService,
		private modelMapper: ModelMapper,
	) { }

	public ngOnInit() {
		const id = Number(this.route.snapshot.paramMap.get('id'));

		/*
		 * JavaScript is horrible and for some reason object comparison doesn't work.
		 * It compares pointers instead of members and therefore two equal objects aren't
		 * the same according to JS. Because of this, pet.owner needs to be set manually.
		 * 	- Augusto
		 */
		this.userService.getAllUsers().pipe(
			switchMap(models => {
				const users = models.map(model => this.modelMapper.userViewToEntity(model));

				return forkJoin(users).pipe(
					switchMap(users => {
						this.users = users;

						return this.petService.getPetById(id).pipe(
							switchMap(model => this.modelMapper.petViewToEntity(model))
						)
					})
				)
			})
		).subscribe(pet => {
			this.pet = pet
			this.pet.owner = this.users.find(user => user.id === this.pet?.owner?.id)
		})
	}

	public updatePet() {
		const { context } = this.route.snapshot.data;
		const path = getPathForContext(context);


		if (this.pet) {
			this.modelMapper.petEntityToUpsert(this.pet).pipe(
				switchMap(dto => this.petService.updatePet(this.pet?.id ?? 0, dto))
			).subscribe(() => {
				this.router.navigate([path, '/pets', this.pet?.id]);
			});
		}
	}
}
