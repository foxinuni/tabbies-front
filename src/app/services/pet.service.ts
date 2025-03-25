import { Injectable } from '@angular/core';
import Pet from 'lib/entities/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private pets: Pet[] = [
    {
      id: 1,
      name: 'Luna',
      breed: 'Negro y Blanco',
      birthDate: new Date('2020-05-20'),
      weight: 30,
      picture: 'assets/images/luna.jpg',
      isDisabled: false,
      owner: { id: 1, name: 'alfredo', document: 12345, hash: 'alfredo', email: 'alfredo@gmail.com', number: '123456789' },
      disease: { id: 1, name: 'Arthritis', description: 'Obesidad', procedure: 'Ejercicio' }
    },
    {
      id: 2,
      name: 'Emilio',
      breed: 'Esfinge',
      birthDate: new Date('2019-10-10'),
      weight: 25,
      picture: 'assets/images/max.jpg',
      isDisabled: false,
      owner: { id: 2, name: 'Emilio', document: 67890, hash: 'emilio', email: 'emilio@example.com', number: '987654321' }
    }
  ];

  getAllPets(): Pet[] {
    return this.pets;
  }

  getPetById(id: number): Pet | undefined {
    return this.pets.find(pet => pet.id === id);
  }

  addPet(pet: Pet): void {
    this.pets.push(pet);
  }

  updatePet(id: number, updatedPet: Pet): void {
    const index = this.pets.findIndex(pet => pet.id === id);
    if (index !== -1) this.pets[index] = updatedPet;
  }

  deletePet(id: number): void {
    this.pets = this.pets.filter(pet => pet.id !== id);
  }

  setActive(id: number, active: boolean): void {
    const pet = this.getPetById(id);
    if (pet) pet.isDisabled = !active;
  }
}
