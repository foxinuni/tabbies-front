import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { UserService } from 'lib/services/user.service';
import { ModelMapper } from 'lib/services/model-mapper.service';
import User from 'lib/entities/user';

@Component({
	selector: 'user-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
	public user?: User

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private userService: UserService,
		private modelMapper: ModelMapper,

	) {}

	public ngOnInit(): void {
		const id = Number(this.route.snapshot.paramMap.get('id'));

		this.userService.getUserById(id).pipe(
			switchMap(model => this.modelMapper.userViewToEntity(model))
		).subscribe(user => {
			this.user = user
		})
	}

	public updateUser(): void {
		if (this.user) {
			this.modelMapper.userEntityToUpsert(this.user).pipe(
				switchMap(dto => this.userService.updateUser(this.user?.id ?? 0, dto))
			).subscribe(() => {
				this.router.navigate(['/veterinarian/users', this.user?.id]);
			});
		}
	}
}
