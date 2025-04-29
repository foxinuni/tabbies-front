import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'lib/services/user.service';
import { ModelMapper } from 'lib/services/model-mapper.service';
import { switchMap } from 'rxjs';
import User from 'lib/entities/user';
import { getPathForContext } from 'src/app/app-routing.module';

@Component({
	selector: 'user-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.css']
})
export class CreateComponent {
	public user: User = {
		id: 0,
		name: '',
		document: 0,
		email: '',
		number: '',
		hash: ''
	};

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private userService: UserService,
		private modelMapper: ModelMapper,
	) { }

	public createUser(): void {
		const { context } = this.route.snapshot.data;
		const path = getPathForContext(context);

		this.modelMapper.userEntityToUpsert(this.user).pipe(
			switchMap(dto => this.userService.createUser(dto))
		).subscribe(() => {
			this.router.navigate([path, 'users']);
		})
	}
}
