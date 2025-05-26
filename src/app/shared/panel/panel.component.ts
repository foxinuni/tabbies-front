import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'lib/services/login.service';

@Component({
	selector: 'panel',
	templateUrl: './panel.component.html',
	styleUrls: ['./panel.component.css']
})
export class PanelComponent {
	constructor(
		private readonly router: Router,
		private readonly loginService: LoginService
	) {}

	public ngOnInit(): void {
		this.loginService.self().subscribe({
			next: (user) => {
				if (user.role === 'veterinary' && this.router.url !== '/veterinarian') {
					this.router.navigate(['/veterinarian']);
				} else if (user.role === 'admin' && this.router.url !== '/admin') {
					this.router.navigate(['/admin']);
				} else if (user.role === 'user' && this.router.url !== '/client') {
					this.router.navigate(['/client']);
				}
			},
			error: () => {
				console.log('User is not logged in');
				this.router.navigate(['/login']);
			}
		});
	}
}
