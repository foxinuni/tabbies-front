import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'home-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';
  success = false;
  error = false;

  constructor(private http: HttpClient) {}

  sendMessage() {
    const data = {
      name: this.name,
      email: this.email,
      message: this.message
    };

    this.http.post('http://localhost:8080/contact', data).subscribe({
      next: () => {
        this.success = true;
        this.error = false;
        this.name = this.email = this.message = '';
      },
      error: () => {
        this.success = false;
        this.error = true;
      }
    });
  }
}
