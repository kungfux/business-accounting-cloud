import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AppUser } from 'src/app/services/app-user';
import { UserPreferences } from 'src/app/services/app-user.service';
import { AuthApiService } from 'src/app/services/api/auth.service';
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
    name: 'Unknown',
    picture: 'help_center',
  });

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AuthApiService,
    private router: Router,
    private userPreferences: UserPreferences
  ) {}

  ngOnInit(): void {
    this.userPreferences.userPreferencesSubject.subscribe((user) => {
      this.loggedInUser = user;

      if (this.loggedInUser.id == 0) {
        // If token is expired, redirect to auth page
        this.router.navigate(['auth']);
      }

      if (this.loggedInUser.companyId != 0) {
        this.company = new Company({
          name: this.loggedInUser.companyName,
          picture: this.loggedInUser.companyPicture,
        });
      }
    });

    this.authenticate();
  }

  onSwitchCompany(): void {
    this.router.navigate(['companies/switch']);
  }

  authenticate(): void {
    if (this.auth.isAuthenticated()) {
      if (this.router.url.endsWith('auth')) {
        this.router.navigate(['dashboard']);
      }
    } else {
      this.router.navigate(['auth']);
    }
  }
}
