import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import User from 'lib/entities/user';
import { UserService } from 'lib/services/user.service';
import { ModelMapper } from 'lib/services/model-mapper.service';
import { switchMap } from 'rxjs';

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
		private userService: UserService,
		private modelMapper: ModelMapper,
	) { }

	public createUser(): void {
		this.modelMapper.userEntityToUpsert(this.user).pipe(
			switchMap(dto => this.userService.createUser(dto))
		).subscribe(() => {
			this.router.navigate(['/veterinarian/users']);
		})
	}
}
