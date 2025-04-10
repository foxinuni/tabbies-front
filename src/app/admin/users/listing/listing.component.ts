import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import User from 'lib/entities/user';
import { ModelMapper } from 'lib/services/model-mapper.service';
import { UserService } from 'lib/services/user.service';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'user-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
	public users: User[] = [];

	constructor(
		private userService: UserService,
		private modelMapper: ModelMapper,
	) {}

	public ngOnInit(): void {
		this.userService.getAllUsers().pipe(
			switchMap(models => {
				const users = models.map(model => this.modelMapper.userViewToEntity(model));
				return forkJoin(users);
			})
		).subscribe(users => {
			this.users = users;
		});
	}
}
