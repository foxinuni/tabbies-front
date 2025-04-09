import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'lib/services/user.service';
import User from 'lib/entities/user';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {

	user: User | undefined;

	constructor(private route: ActivatedRoute, private userService: UserService) { }

	ngOnInit() {
		const id = Number(this.route.snapshot.paramMap.get('id'));
		this.user = this.userService.getUserById(id);
	}

}
