import { Component, OnInit } from '@angular/core';
import User from 'lib/entities/user';
import { UserService } from 'lib/services/user.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
	Users: User[] = [];
	constructor(private userService: UserService){ }
	ngOnInit(): void {
		this.Users = this.userService.getAllUsers();
	}


}
