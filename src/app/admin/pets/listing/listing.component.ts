import { Component, OnInit } from '@angular/core';
import Pet from 'lib/entities/pet';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  pets: Pet[] = [];

  constructor(private petService: PetService) {}

  ngOnInit() {
    this.pets = this.petService.getAllPets();
  }

  toggleStatus(id: number, active: boolean) {
    this.petService.setActive(id, active);
    this.pets = this.petService.getAllPets();}
  }

