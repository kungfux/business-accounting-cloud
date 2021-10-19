import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/api/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  login = '';
  password = '';
  hidePassword = true;
  checkingCredentials = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLoginClick() {
    this.checkingCredentials = true;
    this.authService
      .authenticate(this.login, this.password)
      .subscribe((success) => {
        if (success) {
          // TODO: Navigate to dashboard
          this.router.navigate(['/users']);
          return;
        }
        // TODO: Show error
        this.checkingCredentials = false;
      });
  }
}
