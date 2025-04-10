import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'lib/services/login.service';

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

	public login(): void {
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
