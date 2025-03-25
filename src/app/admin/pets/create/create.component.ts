import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { PetService } from 'lib/services/pet.service';
import Pet from 'lib/entities/pet';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  pet: Pet = {
    id: 0,
    name: '',
    breed: '',
    birthDate: new Date(),
    weight: 0,
    picture: '',
    isDisabled: false,
    owner: { id: 0, name: '', document: 0, hash: '', email: '', number: '' }
  };

  constructor(private petService: PetService, private router: Router) {}

  createPet() {
    this.pet.id = new Date().getTime();
    this.petService.addPet(this.pet);
    
    this.router.navigate(['/admin/pets']);
  }
}
