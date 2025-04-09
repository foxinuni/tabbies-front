import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'lib/services/user.service';
import User from 'lib/entities/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'user-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
	user: User | undefined;

	constructor(private route: ActivatedRoute, private userService: UserService, private http: HttpClient) { }

	ngOnInit() {
		const id = Number(this.route.snapshot.paramMap.get('id'));
		this.userService.getUserById(this.http, id).subscribe((user) => {
			this.user = user;
		});
	}

}
