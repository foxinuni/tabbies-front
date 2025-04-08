import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from 'lib/services/pet.service';
import Pet from 'lib/entities/pet';
import User from 'lib/entities/user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  pet: Pet | undefined;


  owners: User[] = [
    { id: 1, name: 'alfredo', document: 12345, hash: 'alfredo', email: 'alfredo@gmail.com', number: '123456789' },
    { id: 2, name: 'Emilio', document: 67890, hash: 'emilio', email: 'emilio@example.com', number: '987654321' },
  ];


  constructor(private route: ActivatedRoute, private petService: PetService, private router: Router) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pet = this.petService.getPetById(id);
  }


  updatePet() {
    if (this.pet) {
      this.petService.updatePet(this.pet.id, this.pet);
      this.router.navigate(['/admin/pets', this.pet.id]);
    }
  }
}
