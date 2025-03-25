import { Component } from '@angular/core';
import Pet from 'lib/entities/pet';
import { PetService } from 'src/app/services/pet.service';


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

  constructor(private petService: PetService) {}

  createPet() {
    this.pet.id = new Date().getTime();
    this.petService.addPet(this.pet);
  }
}
