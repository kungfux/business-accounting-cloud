import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  login = '';
  password = '';
  hidePassword = true;
  checkingCredentials = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // TODO: CHeck if authenticated and navigate to dashboard
  }

  onLoginClick() {
    this.checkingCredentials = true;
    this.authService.auth(this.login, this.password).subscribe(success => {
      if (success){
        // TODO: Navigate to dashboard
        return;
      }
        // TODO: Show error
        this.checkingCredentials = false;
      });
  }
}
