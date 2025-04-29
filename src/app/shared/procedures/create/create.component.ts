import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcedureUpsert } from 'lib/dtos/procedure';
import Medicine from 'lib/entities/medicine';
import Veterinary from 'lib/entities/veterinary';
import { MedicineService } from 'lib/services/medicine.service';
import { ProcedureService } from 'lib/services/procedure.service';
import { VeterinarianService } from 'lib/services/veterinarian.service';

@Component({
  selector: 'procedure-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class ProcedureCreateComponent {
  medicines: Medicine[] = [];
  veterinaries: Veterinary[] = [];

  treatment: ProcedureUpsert = {
    notes: '',
    quantity: 1,
    medicineId: null,
    veterinaryId: null,
    petId: 0
  };

  petId: number = 0;

  constructor(
    private medicineService: MedicineService,
    private veterinaryService: VeterinarianService,
    private procedureService: ProcedureService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
    this.veterinaryService.getAllVets().subscribe({
      next: (data) => {
        this.veterinaries = data;
        console.log('Veterinaries:', this.veterinaries);
      },
      error: (err) => {
        console.error('Error loading veterinaries:', err);
      }
    });
  }

  assignTreatment(): void {
    if (!this.treatment.notes || !this.treatment.medicineId || !this.treatment.veterinaryId || !this.treatment.quantity) {
      alert('Por favor, completa todos los campos del tratamiento.');
      return;
    }
  
    this.treatment.medicineId = Number(this.treatment.medicineId);
    this.treatment.veterinaryId = Number(this.treatment.veterinaryId);
  
    console.log('Asignando tratamiento:', this.treatment);
  
    this.procedureService.createProcedure(this.treatment).subscribe({
      next: () => {
        alert('Tratamiento asignado exitosamente.');
        this.router.navigate(['/veterinarian/pets', this.petId]);
      },
      error: (err) => {
        console.error('Error al asignar tratamiento:', err);
        alert('Error al asignar tratamiento.');
      }
    });
  }
  
}
