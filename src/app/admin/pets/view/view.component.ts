import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { PetService } from 'lib/services/pet.service';
import Pet from 'lib/entities/pet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  pet: Pet | undefined;

  constructor(private route: ActivatedRoute, private petService: PetService, private http: HttpClient) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.petService.getPetById(this.http, id).subscribe((pet: Pet | undefined) => {
			this.pet = pet;
		});
  }
}
