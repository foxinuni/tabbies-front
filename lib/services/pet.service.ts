import { Injectable } from '@angular/core';
import Pet from 'lib/entities/pet';
import { config } from './config';
import { PetGetDTO } from 'lib/dtos/pets';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { switchAll } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserGetDTO } from 'lib/dtos/users';
import User from 'lib/entities/user';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  public getAllPets(client: HttpClient): Observable<Pet[]> {
		return client.get<PetGetDTO[]>(`${config.backend_endpoint}/pets/`).pipe(
			// Get all pets from the backend
			map((petDTOs: PetGetDTO[]) => petDTOs.map(petDTO => ({
				id: petDTO.id,
				name: petDTO.name,
				breed: petDTO.breed,
				birthDate: new Date(petDTO.birthDate),
				weight: petDTO.weight,
				picture: petDTO.picture,
				isDisabled: petDTO.isDisabled,
				ownerId: petDTO.ownerId
			}))),

			// For each pet, fetch the owner details
			map(pets => pets.map(pet =>
				client.get<UserGetDTO>(`${config.backend_endpoint}/users/${pet.ownerId}`).pipe(
					// Cast the response to UserGetDTO
					map((ownerDTO: UserGetDTO) => ({
						id: ownerDTO.id,
						name: ownerDTO.name,
						document: ownerDTO.document,
						email: ownerDTO.email,
						number: ownerDTO.number,
						hash: '',
					} as User)),

					// Map the owner details to the pet object
					map(owner => ({ ...pet, owner } as Pet)),

					catchError(error => {
						console.error(`Error fetching owner for pet ${pet.id}:`, error);
						return of({ ...pet, owner: undefined });
					})
				)
			)),

			map(petObservables => petObservables.length ? forkJoin(petObservables) : of([])),
			catchError(error => {
				console.error('Error fetching pets:', error);
				return of([]);
			}),

			switchAll()
		);
  }

	getPetById(client: HttpClient, id: number): Observable<Pet | undefined> {
		return client.get<PetGetDTO>(`${config.backend_endpoint}/pets/${id}`).pipe(
			map((petDTO: PetGetDTO) => ({
				id: petDTO.id,
				name: petDTO.name,
				breed: petDTO.breed,
				birthDate: new Date(petDTO.birthDate),
				weight: petDTO.weight,
				picture: petDTO.picture,
				isDisabled: petDTO.isDisabled,
				ownerId: petDTO.ownerId
			})),

			// Fetch the owner details and link it to the pet
			map(pet =>
				client.get<UserGetDTO>(`${config.backend_endpoint}/users/${pet.ownerId}`).pipe(
					map((ownerDTO: UserGetDTO) => ({
						id: ownerDTO.id,
						name: ownerDTO.name,
						document: ownerDTO.document,
						email: ownerDTO.email,
						number: ownerDTO.number,
						hash: '',
					} as User)),
					map(owner => ({ ...pet, owner } as Pet)),
					catchError(error => {
						console.error(`Error fetching owner for pet ${pet.id}:`, error);
						return of({ ...pet, owner: undefined });
					})
				)
			),

			switchAll(),

			catchError(error => {
				console.error('Error fetching pet:', error);
				return of(undefined);
			})
		);
	}

	addPet(client: HttpClient, pet: Pet): Observable<Pet> {
		return client.post<Pet>(`${config.backend_endpoint}/pets/`, pet).pipe(
			catchError(error => {
				console.error('Error adding pet:', error);
				return of(pet);
			})
		);
	}

	updatePet(client: HttpClient, id: number, updatedPet: Pet): Observable<Pet> {
		return client.put<Pet>(`${config.backend_endpoint}/pets/${id}`, updatedPet).pipe(
			catchError(error => {
				console.error('Error updating pet:', error);
				return of(updatedPet);
			})
		);
	}

	deletePet(client: HttpClient, id: number): Observable<void> {
		return client.delete<void>(`${config.backend_endpoint}/pets/${id}`).pipe(
			catchError(error => {
				console.error('Error deleting pet:', error);
				return of(undefined);
			})
		);
	}

	setActive(client: HttpClient, id: number, active: boolean): Observable<Pet | undefined> {
		throw new Error('Method not implemented.');
	}
}
