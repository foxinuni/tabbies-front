import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from 'lib/services/pet.service';
import Pet from 'lib/entities/pet';
import User from 'lib/entities/user';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'lib/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  pet: Pet | undefined;

  owners: User[] = [];
	selectedOwnerId: number | undefined;

  constructor(private route: ActivatedRoute, private petService: PetService, private userService: UserService, private router: Router, private http: HttpClient) {}

	ngOnInit() {
		const id = Number(this.route.snapshot.paramMap.get('id'));

		this.petService.getPetById(this.http, id).subscribe((pet: Pet | undefined) => {
			this.pet = pet;
			this.selectedOwnerId = pet?.owner?.id;
			console.log("selectedOwnerId", this.selectedOwnerId);
		});

		this.userService.getAllUsers(this.http).subscribe((users: User[]) => {
			this.owners = users;
		});
	}

  updatePet() {
    if (this.pet) {
      this.petService.updatePet(this.http, this.pet.id, this.pet).subscribe((updatedPet: Pet) => {
				this.router.navigate(['/admin/pets', this.pet?.id]);
			});
    }
  }
}
