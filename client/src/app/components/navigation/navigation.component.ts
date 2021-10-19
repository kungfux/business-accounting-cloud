import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/api/auth.service';
import { User } from 'src/app/services/api/user';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

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

  user: User = new User();

  @Input() title: string = '';

  company = { name: 'Fox Parking Ltd.', logo: 'emoji_transportation' };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.apiService.userSubject.subscribe((user) => {
      this.user = user;
    });

    if (this.authService.restoreAuthentication()) {
      // TODO: Navigate to dashboard
      this.router.navigate(['/users']);
    } else {
      this.router.navigate(['']);
    }
  }
}
