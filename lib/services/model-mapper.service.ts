import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { PetService } from './pet.service';
import { HttpClient } from '@angular/common/http';
import Pet from 'lib/entities/pet';
import { PetUpsert, PetView } from 'lib/dtos/pets';
import { map, Observable, of, switchAll } from 'rxjs';
import { UserView } from 'lib/dtos/users';
import User from 'lib/entities/user';

@Injectable({
  providedIn: 'root'
})
export class ModelMapper {
    constructor(
        private readonly userService: UserService
    ) {}

    public petViewToEntity(dto: PetView): Observable<Pet> {
        return this.userService.getUserById(dto.ownerId).pipe(
            map((user) => ({ ...dto, owner: { ...user, hash: '' }}))
        )
    }

	public petEntityToUpsert(dto: Pet): Observable<PetUpsert> {
		return of({ ...dto, ownerId: dto.owner?.id ?? 0 });
	}

	public userViewToEntity(dto: UserView): Observable<User> {
		return of({ ...dto, hash: '' });
	}
}
