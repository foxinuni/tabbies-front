import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PetService } from 'lib/services/pet.service';
import Pet from 'lib/entities/pet';


@Component({
  selector: 'pet-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  pets: Pet[] = [];

  constructor(private petService: PetService, private http: HttpClient) {}

  ngOnInit() {
		this.petService.getAllPets(this.http).subscribe((pets: Pet[]) => {
			this.pets = pets;
		});
	}

  toggleStatus(id: number, active: boolean) {
    //this.petService.setActive(id, active);
    // this.pets = this.petService.getAllPets();
  }
}

