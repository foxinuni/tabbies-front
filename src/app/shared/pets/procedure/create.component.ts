import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcedureUpsert } from 'lib/dtos/procedure';
import { MedicineService } from 'lib/services/medicine.service';
import { ProcedureService } from 'lib/services/procedure.service';
import { VeterinarianService } from 'lib/services/veterinarian.service';
import Medicine from 'lib/entities/medicine';
import Veterinary from 'lib/entities/veterinary';
import { getPathForContext } from 'src/app/app-routing.module';
import { forkJoin, switchMap } from 'rxjs';
import { ModelMapper } from 'lib/services/model-mapper.service';

@Component({
	selector: 'procedure-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.css']
})
export class CreateComponent {
	medicines: Medicine[] = [];
	veterinaries: Veterinary[] = [];
	self: Veterinary | null = null;

	treatment: ProcedureUpsert = {
		notes: '',
		quantity: 1,
		medicineId: null,
		veterinaryId: null,
		petId: 0
	};

	petId: number = 0;

	constructor(
		private modelMapper: ModelMapper,
		private medicineService: MedicineService,
		private veterinaryService: VeterinarianService,
		private procedureService: ProcedureService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit(): void {
		this.petId = Number(this.route.snapshot.paramMap.get('id'));
		this.treatment.petId = this.petId;

		this.loadMedicines();
		this.loadVeterinaries();
	}

	loadMedicines(): void {
		this.medicineService.getAllMedicine().subscribe({
			next: (data) => {
				this.medicines = data;
				console.log('Medicines:', this.medicines);
			},
			error: (err) => {
				console.error('Error loading medicines:', err);
			}
		});
	}

	loadVeterinaries(): void {
		this.veterinaryService.getSelf().pipe(
			switchMap(self => this.modelMapper.vetViewToEntity(self)),
		).subscribe((self) => {
			this.self = self;
			this.treatment.veterinaryId = self.id;
		});

		this.veterinaryService.getAllVets().pipe(
			switchMap(models => {
				const veterinarians = models.map(model => this.modelMapper.vetViewToEntity(model));
				return forkJoin(veterinarians);
			})
		).subscribe(veterinaries => {
			this.veterinaries = veterinaries;
			console.log('Veterinaries:', this.veterinaries);
		});
	}

	assignTreatment(): void {
		const { context } = this.route.snapshot.data;
		const path = getPathForContext(context);

		if (!this.treatment.notes || !this.treatment.medicineId || !this.treatment.veterinaryId || !this.treatment.quantity) {
			alert('Por favor, completa todos los campos del tratamiento.');
			return;
		}

		this.treatment.medicineId = Number(this.treatment.medicineId);
		this.treatment.veterinaryId = Number(this.treatment.veterinaryId);


		console.log('Asignando tratamiento:', this.treatment);

		this.procedureService.createProcedure(this.treatment).subscribe(() => {
			if (this.treatment.medicineId !== null) {
				this.updateMedicineStock(this.treatment.medicineId, this.treatment.quantity);
			} else {
				console.error('Medicine ID is null.');
			}
			this.router.navigate([path, 'pets', this.petId]);
		});


	}

	updateMedicineStock(medicineId: number, quantity: number): void {
		const medicine = this.medicines.find(m => m.id === medicineId);
		if (!medicine) {
			console.error('Medicina no encontrada.');
			return;
		}

		const updatedMedicine = {
			...medicine,
			stock: medicine.stock - quantity, // Reducir el stock
			sold: (medicine.sold || 0) + quantity // Aumentar el valor de sold
		};

		this.medicineService.updateMedicine(medicineId, updatedMedicine).subscribe({
			next: () => {
				console.log('Stock y sold actualizados correctamente.');
			},
			error: (err) => {
				console.error('Error al actualizar el stock de la medicina:', err);
			}
		});
	}
}
