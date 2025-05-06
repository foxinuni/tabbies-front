import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { PetService } from 'lib/services/pet.service';
import { ModelMapper } from 'lib/services/model-mapper.service';
import Pet from 'lib/entities/pet';
import { ProcedureService } from 'lib/services/procedure.service';
import Procedure from 'lib/entities/procedure';

@Component({
	selector: 'pet-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.css']
})
export class ViewComponent {
	public pet: Pet | undefined;
	public procedures: Procedure[] = [];

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

		this.procedureService.getProceduresByPetId(id).pipe(
			switchMap(models => {
				const procedures = models.map(model => this.modelMapper.procedureViewToEntity(model));
				return forkJoin(procedures);
			})
		).subscribe(procedures => {
			console.log('Procedures:', procedures);
			this.procedures = procedures;
		});
	}
}
