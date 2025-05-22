import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'lib/services/login.service';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	constructor(
		private readonly loginService: LoginService,
		private readonly router: Router
	) {}

	public logout(): void {
		this.loginService.logout().subscribe({
			next: () => {
				this.router.navigate(['/home']);
			},
			error: (error) => {
				console.error('Logout failed', error);
			}
		});
	}
}
