import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { PetService } from './pet.service';
import { HttpClient } from '@angular/common/http';
import Pet from 'lib/entities/pet';
import { PetUpsert, PetView } from 'lib/dtos/pets';
import { map, Observable, of, switchAll } from 'rxjs';
import { UserUpsert, UserView } from 'lib/dtos/users';
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

	public petEntityToUpsert(model: Pet): Observable<PetUpsert> {
		return of({ ...model, ownerId: model.owner?.id ?? 0 });
	}

	public userViewToEntity(dto: UserView): Observable<User> {
		return of({ ...dto, hash: '' });
	}

	public userEntityToUpsert(model: User): Observable<UserUpsert> {
		return of({ ...model, password: model.hash });
	}
}
