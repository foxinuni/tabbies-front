import { Component } from '@angular/core';
import { MedicineService } from 'lib/services/medicine.service';
import { PetService } from 'lib/services/pet.service';
import { ProcedureService } from 'lib/services/procedure.service';
import { UserService } from 'lib/services/user.service';
import { VeterinarianService } from 'lib/services/veterinarian.service';

interface Stats {
	pets: number;
	users: number;
	veterinarians: number;
	medicines: number;
	procedures: number;
}

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
	public stats: Stats = {
		pets: 0,
		users: 0,
		veterinarians: 0,
		medicines: 0,
		procedures: 0,
	};

	constructor(
		private readonly veterinarianService: VeterinarianService,
		private readonly medicineService: MedicineService,
		private readonly procedureService: ProcedureService,
		private readonly userService: UserService,
		private readonly petService: PetService,
	) { }

	public ngOnInit(): void {
		this.veterinarianService.getAllVets().subscribe((vets) => {
			this.stats.veterinarians = vets.length;
		});

		this.medicineService.getAllMedicine().subscribe((medicines) => {
			this.stats.medicines = medicines.length;
		});

		this.procedureService.getAllProcedures().subscribe((procedures) => {
			this.stats.procedures = procedures.length;

		});

		this.userService.getAllUsers().subscribe((users) => {
			this.stats.users = users.length;
		});

		this.petService.getAllPets().subscribe((pets) => {
			this.stats.pets = pets.length;
		});
	}
}
