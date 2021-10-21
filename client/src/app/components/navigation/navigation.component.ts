import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/api/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { LoggedInUser } from 'src/app/loggedInUser';
import { User } from 'src/app/services/api/models/user';
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
  loggedInUser: LoggedInUser = new LoggedInUser();
  company: Company = new Company({
    name: 'Unknown',
    picture: 'help_center',
  });

  constructor(
    private breakpointObserver: BreakpointObserver,
    private api: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.monitorLoggedInUser();
    this.authenticate();
  }

  onSwitchCompany(): void {
    this.router.navigate(['companies/switch']);
  }

  authenticate(): void {
    if (this.authService.restoreAuthentication()) {
      if (this.router.url.endsWith('auth')) {
        this.router.navigate(['/dashboard']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  monitorLoggedInUser(): void {
    this.api.userSubject.subscribe((user) => {
      this.loggedInUser = user;

      if (this.loggedInUser.id !== 0) {
        this.api.get<User>(`/users/${this.loggedInUser.id}`).subscribe({
          next: (data) => {
            this.loggedInUser.isAdmin = data.admin;
          },
        });
      }

      if (this.loggedInUser.id !== 0) {
        if (this.loggedInUser._companyId === 0) {
          this.api.get<Company[]>('/companies').subscribe({
            next: (data) => {
              if (data.length > 0) {
                this.loggedInUser.setCompany(
                  data[0].id,
                  data[0].picture,
                  data[0].name
                );
                this.company = new Company({
                  name: data[0].name,
                  picture: data[0].picture,
                });
              }
            },
          });
        } else {
          this.api
            .get<Company>(`/companies/${this.loggedInUser._companyId}`)
            .subscribe({
              next: (data) => {
                this.company = new Company({
                  name: data.name,
                  picture: data.picture,
                });
              },
            });
        }
      }
    });
  }
}
