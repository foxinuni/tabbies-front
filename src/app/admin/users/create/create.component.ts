import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import User from 'lib/entities/user';
import { UserService } from 'lib/services/user.service';

@Component({
  selector: 'user-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  user: User = {
    id: 0,
    name: '',
    document: 0,
    email: '',
    number: '',
    hash: ''
  };

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private router: Router
  ) {}

  createUser(): void {
	/*
    this.userService.createUser(this.http, this.user).subscribe({
      next: () => {
        this.router.navigate(['/admin/users']);
      },

      error: (err) => {
        console.error('Error creando al usaraio:', err);
      }
    });
	*/
  }
}
