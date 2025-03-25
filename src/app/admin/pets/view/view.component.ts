import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { PetService } from 'src/app/services/pet.service';
import Pet from 'lib/entities/pet';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  pet: Pet | undefined;

  constructor(private route: ActivatedRoute, private petService: PetService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pet = this.petService.getPetById(id);
  }
}
