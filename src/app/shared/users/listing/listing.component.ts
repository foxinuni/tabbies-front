import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import User from 'lib/entities/user';
import { ModelMapper } from 'lib/services/model-mapper.service';
import { UserService } from 'lib/services/user.service';
import { forkJoin, switchMap } from 'rxjs';
import { PanelContext } from 'src/app/app-routing.module';

@Component({
  selector: 'user-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
	public users: User[] = [];
	public enableDeletion: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private userService: UserService,
		private modelMapper: ModelMapper,
	) {}

	public ngOnInit(): void {
		const { context } = this.route.snapshot.data;

		console.log('Context:', context);

		if (context === PanelContext.Admin) {
			this.enableDeletion = true;
		}

		this.userService.getAllUsers().pipe(
			switchMap(models => {
				const users = models.map(model => this.modelMapper.userViewToEntity(model));
				return forkJoin(users);
			})
		).subscribe(users => {
			this.users = users;
		});
	}

	public deleteUser(id: number): void {
		this.userService.deleteUser(id).subscribe(() => {
			this.users = this.users.filter(user => user.id !== id);
		});
	}
}
