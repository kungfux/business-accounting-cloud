import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginApiService } from 'src/app/services/api/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login = '';
  password = '';
  hidePassword = true;
  checkingCredentials = false;

  constructor(private loginApi: LoginApiService, private router: Router) {}

  ngOnInit(): void {}

  onLoginClick() {
    this.checkingCredentials = true;
    this.loginApi
      .authenticate(this.login, this.password)
      .subscribe((success) => {
        if (success) {
          this.router.navigate(['/dashboard']);
          return;
        }
        // TODO: Show error
        this.checkingCredentials = false;
      });
  }
}
