import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Pet from 'lib/entities/pet';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  pet: Pet | undefined;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService
  ) {}


  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pet = this.petService.getPetById(id);
  }

  updatePet() {
    if (this.pet) {
      this.petService.updatePet(this.pet.id, this.pet);
    }
  }
}
