import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'lib/services/user.service';
import User from 'lib/entities/user';
import { HttpClient } from '@angular/common/http';
import { ModelMapper } from 'lib/services/model-mapper.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'user-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
	public user?: User;

	constructor(
		private route: ActivatedRoute,
		private userService: UserService,
		private modelMapper: ModelMapper,
	) { }

	public ngOnInit() {
		const id = Number(this.route.snapshot.paramMap.get('id'));

		this.userService.getUserById(id).pipe(
			switchMap(model => this.modelMapper.userViewToEntity(model))
		).subscribe(user => {
			this.user = user
		});
	}

}
