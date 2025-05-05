import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { PetService } from 'lib/services/pet.service';
import { ModelMapper } from 'lib/services/model-mapper.service';
import Pet from 'lib/entities/pet';
import { ProcedureService } from 'lib/services/procedure.service';

@Component({
	selector: 'pet-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.css']
})
export class ViewComponent {
	public pet: Pet | undefined;
	public procedures: any[] = [];

	constructor(
		private readonly route: ActivatedRoute,
		private readonly petService: PetService,
		private readonly procedureService: ProcedureService,
		private readonly modelMapper: ModelMapper
	) { }

	public ngOnInit() {
		const id = Number(this.route.snapshot.paramMap.get('id'));

		this.petService.getPetById(id).pipe(
			switchMap(model => this.modelMapper.petViewToEntity(model))
		).subscribe(pet => {
			this.pet = pet
		})
		this.procedureService.getProceduresByPetId(id).subscribe(procedures => {
			this.procedures = procedures;
			console.log('Procedures:', this.procedures); // Debugging: Log the procedures array
		});
	}
}
