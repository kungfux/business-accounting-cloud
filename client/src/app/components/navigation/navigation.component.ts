import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AppUser } from 'src/app/services/appUser';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';
import { LoginApiService } from 'src/app/services/api/login.service';
import { Company } from 'src/app/services/api/models/company';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  @Input() title: string = '';
  loggedInUser: AppUser = new AppUser();
  company: Company = new Company({
    name: 'Выбрать',
    logo: 'notifications_active',
  });

  constructor(
    private breakpointObserver: BreakpointObserver,
    private login: LoginApiService,
    private router: Router,
    private userPreferences: UserPreferencesService
  ) {}

  ngOnInit(): void {
    this.userPreferences.userPreferencesSubject.subscribe((user) => {
      this.loggedInUser = user;

      if (this.loggedInUser.id == 0) {
        // If token is expired, redirect to login page
        this.router.navigate(['login']);
        return;
      }

      if (this.loggedInUser.companyId != 0) {
        this.company = new Company({
          name: this.loggedInUser.companyName,
          logo: this.loggedInUser.companyLogo,
        });
      }
    });

    this.authenticate();
  }

  onSwitchCompany(): void {
    this.router.navigate(['companies/switch']);
  }

  authenticate(): void {
    if (this.login.isAuthenticated()) {
      if (this.router.url === '') {
        this.router.navigate(['dashboard']);
      }
    } else {
      this.router.navigate(['login']);
    }
  }

  logout(): void {
    this.login.logout();
  }
}
