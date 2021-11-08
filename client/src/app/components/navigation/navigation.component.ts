import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginApiService } from 'src/app/services/api/login.service';
import { Company } from 'src/app/services/api/models/company';
import { AppUser } from 'src/app/services/appUser';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  @Input() title: string = '';
  activeRoute: string = '';
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

      if (!this.loggedInUser.id) {
        // If token is expired, redirect to login page
        this.router.navigate(['/login']);
        return;
      }

      if (this.loggedInUser.companyId) {
        this.company = new Company({
          name: this.loggedInUser.companyName,
          logo: this.loggedInUser.companyLogo,
        });
      }
    });

    this.authenticate();
  }

  onOpenedStart(): void {
    this.activeRoute = this.router.url;
  }

  onSwitchCompany(): void {
    this.router.navigate(['/companies/switch']);
  }

  onProfileClick(): void {
    this.router.navigate(['/profile']);
  }

  authenticate(): void {
    if (this.login.isAuthenticated()) {
      if (this.router.url !== '/') {
        this.router.navigate(['/dashboard']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.login.logout();
  }
}
