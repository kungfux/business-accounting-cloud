import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserPreferencesService } from '../services/userPreferences.service';

@Injectable({
  providedIn: 'root',
})
export class AdminUserGuard implements CanActivate {
  constructor(private userPreferences: UserPreferencesService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userPreferences.admin;
  }
}
