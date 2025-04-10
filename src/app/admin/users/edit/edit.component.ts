import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'lib/services/user.service';
import User from 'lib/entities/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  user: User = {
    id: 0,
    name: '',
    email: '',
    document: 0,
    number: '',
    hash: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.userService.getUserById(this.http, id).subscribe((data) => {
        if (data) {
          this.user = data;
        }
      });
    }
  }

  updateUser(): void {
    this.userService.updateUser(this.http, this.user.id, this.user).subscribe(() => {
      this.router.navigate(['/admin/users']);
    });
  }
}
