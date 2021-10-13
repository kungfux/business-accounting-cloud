import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  onLoginClick() {
    this.checkingCredentials = true;
  }
}
