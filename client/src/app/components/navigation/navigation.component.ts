import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/api/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { LoggedInUser } from 'src/app/loggedInUser';
import { User } from 'src/app/services/api/models/user';

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

  loggedInUser: LoggedInUser = new LoggedInUser();

  @Input() title: string = '';

  company = { name: 'Fox Parking Ltd.', logo: 'emoji_transportation' };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private api: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.api.userSubject.subscribe((user) => {
      this.loggedInUser = user;

      if (this.loggedInUser.id !== 0) {
        this.api.get<User>(`/users/${this.loggedInUser.id}`).subscribe({
          next: (data) => {
            this.loggedInUser.isAdmin = data.admin;
          },
        });
      }
    });

    if (this.authService.restoreAuthentication()) {
      if (this.router.url.endsWith('auth')) {
        this.router.navigate(['/dashboard']);
      }
    } else {
      this.router.navigate(['']);
    }
  }
}
