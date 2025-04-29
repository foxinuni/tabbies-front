import { Component, OnInit } from '@angular/core';
import { MedicineService } from 'lib/services/medicine.service';
import { ModelMapper } from 'lib/services/model-mapper.service';
import Medicine from 'lib/entities/medicine';
import { forkJoin, switchMap } from 'rxjs';

@Component({
	selector: 'medicine-upload',
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
	medicines: Medicine[] = [];

	constructor(
		private readonly medicineService: MedicineService,
		private readonly modelMapper: ModelMapper,
	) {}

	ngOnInit(): void {
		this.medicineService.getAllMedicine().pipe(
			switchMap(models => {
				const medicines = models.map(model => this.modelMapper.medicineViewToEntity(model));
				return forkJoin(medicines);
			})
		).subscribe(medicines => {
			this.medicines = medicines;
		});
	}
}
