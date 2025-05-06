import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { PetService } from './pet.service';
import Pet from 'lib/entities/pet';
import { PetUpsert, PetView } from 'lib/dtos/pets';
import { forkJoin, map, Observable, of, switchAll, switchMap } from 'rxjs';
import { UserUpsert, UserView } from 'lib/dtos/users';
import User from 'lib/entities/user';
import { VeterinarianService } from './veterinarian.service';
import { VeterinarianUpsert, VeterinarianView } from 'lib/dtos/veterinarian';
import Veterinary from 'lib/entities/veterinary';
import { ProcedureUpsert, ProcedureView } from 'lib/dtos/procedure';
import Procedure from 'lib/entities/procedure';
import { MedicineService } from './medicine.service';
import { MedicineUpsert, MedicineView } from 'lib/dtos/medicine';
import Medicine from 'lib/entities/medicine';

@Injectable({
  providedIn: 'root'
})
export class ModelMapper {
    constructor(
        private readonly userService: UserService,
		private readonly petService: PetService,
		private readonly vetService: VeterinarianService,
		private readonly medicineService: MedicineService,
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

	public vetViewToEntity(dto: VeterinarianView): Observable<Veterinary> {
		return of({ ...dto });
	}

	public vetEntityToUpsert(model: Veterinary): Observable<VeterinarianUpsert> {
		return of({ ...model });
	}

	public medicineViewToEntity(dto: MedicineView): Observable<Medicine> {
		return of({ ...dto });
	}

	public medicineEntityToUpsert(model: Medicine): Observable<MedicineUpsert> {
		return of({ ...model });
	}

	public procedureViewToEntity(dto: ProcedureView): Observable<Procedure> {
		return forkJoin([
			this.vetService.getVetById(dto.veterinaryId).pipe(switchMap((vet) => this.vetViewToEntity(vet))),
			this.petService.getPetById(dto.petId).pipe(switchMap((pet) => this.petViewToEntity(pet))),
			this.medicineService.getMedicineById(dto.medicineId).pipe(switchMap((medicine) => this.medicineViewToEntity(medicine))),
		]).pipe(
			map(([veterinarian, pet, medicine]) => ({ ...dto, veterinarian, pet, medicine })),
		);
	}

	public procedureEntityToUpsert(model: Procedure): Observable<ProcedureUpsert> {
		return of({ ...model, veterinaryId: model.veterinarian?.id, petId: model.pet?.id, medicineId: model.medicine?.id });
	}
}
