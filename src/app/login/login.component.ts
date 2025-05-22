import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'lib/services/login.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
	constructor(
		private readonly router: Router,
		private readonly loginService: LoginService
	) {}

	public email: string = '';
	public password: string = '';
	public errorMessage: string = '';

	public ngOnInit(): void {
		this.loginService.self().subscribe({
			next: (user) => {
				if (user.role === 'veterinary') {
					this.router.navigate(['/veterinarian']);
				} else if (user.role === 'admin') {
					this.router.navigate(['/admin']);
				} else if (user.role === 'user') {
					this.router.navigate(['/client']);
				}
			},
			error: () => {
				console.log('User is not logged in');
			}
		});
	}

	public login(): void {
		if (this.email === '' || this.password === '') {
			this.errorMessage = 'Please fill in all fields';
			return;
		}

		this.loginService.login(this.email, this.password).pipe(
			switchMap(() => this.loginService.self())
		).subscribe({
			next: (user) => {
				if (user.role === 'user') {
					this.router.navigate(['/client']);
				} else if (user.role === 'veterinary') {
					this.router.navigate(['/veterinarian']);
				} else if (user.role === 'admin') {
					this.router.navigate(['/admin']);
				}
			},
			error: (error) => {
				console.log(error);
				this.errorMessage = error.status === 401
					? 'Invalid username or password'
					: 'Unable to fetch user details';
			}
		});
	}

	public loginClient(): void {
		this.loginService.login(this.email, this.password).subscribe({
			next: () => {
				this.router.navigate(['/client']);
			},
			error: (error) => {
				console.log(error);
				this.errorMessage = 'Invalid username or password';
			}
		});
	}
}
