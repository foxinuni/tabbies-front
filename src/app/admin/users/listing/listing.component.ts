import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import User from 'lib/entities/user';
import { UserService } from 'lib/services/user.service';

@Component({
  selector: 'user-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
	users: User[] = [];

	constructor(private userService: UserService, private http: HttpClient) {}

	ngOnInit(): void {
		this.userService.getAllUsers(this.http).subscribe((users: User[]) => {
			this.users = users;
		});
	}
}
