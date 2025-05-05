import { Component } from '@angular/core';
import { MedicineService } from 'lib/services/medicine.service';
import { PetService } from 'lib/services/pet.service';
import { ProcedureService } from 'lib/services/procedure.service';
import { UserService } from 'lib/services/user.service';
import { VeterinarianService } from 'lib/services/veterinarian.service';
import { MedicineView } from 'lib/dtos/medicine';
import { ProcedureView } from 'lib/dtos/procedure';

interface Stats {
	pets: number;
	users: number;
	veterinarians: number;
	medicines: number;
	procedures: number;
	earnings: number;
	investment: number;
	popularTreatments: { name: string; count: number }[];
}

@Component({
	selector: 'dashboard',
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
		earnings: 0,
		investment: 0,
		popularTreatments: [],
	};

	private medicinesMap = new Map<number, MedicineView>();

	constructor(
		private readonly veterinarianService: VeterinarianService,
		private readonly medicineService: MedicineService,
		private readonly procedureService: ProcedureService,
		private readonly userService: UserService,
		private readonly petService: PetService,
	) {}

	public ngOnInit(): void {
		this.veterinarianService.getAllVets().subscribe((vets) => {
			this.stats.veterinarians = vets.length;
		});

		this.userService.getAllUsers().subscribe((users) => {
			this.stats.users = users.length;
		});

		this.petService.getAllPets().subscribe((pets) => {
			this.stats.pets = pets.length;
		});

		this.medicineService.getAllMedicine().subscribe((medicines) => {
			this.stats.medicines = medicines.length;
			let totalBuy = 0;
			let totalSell = 0;

			medicines.forEach(med => {
				totalBuy += med.buyPrice * med.stock;
				totalSell += med.sellPrice * med.sold;
				this.medicinesMap.set(med.id, med);
			});

			this.stats.investment = totalBuy;
			this.stats.earnings = totalSell;
		});

		this.procedureService.getAllProcedures().subscribe((procedures: ProcedureView[]) => {
			this.stats.procedures = procedures.length;

			const treatmentCount: Record<number, number> = {};

			procedures.forEach(p => {
				if (p.medicineId != null) {
					treatmentCount[p.medicineId] = (treatmentCount[p.medicineId] || 0) + 1;
				}
			});

			this.stats.popularTreatments = Object.entries(treatmentCount)
				.map(([id, count]) => ({
					name: this.medicinesMap.get(+id)?.name ?? 'Desconocido',
					count,
				}))
				.sort((a, b) => b.count - a.count)
				.slice(0, 3);
		});
	}
}
