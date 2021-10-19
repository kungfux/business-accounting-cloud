import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { ApiService } from './api.service';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new Subject<User>();
  private serviceEndpoint: string = '/auth';

  get user(): Subject<User> {
    return this.currentUserSubject;
  }
  constructor(
    private api: ApiService,
    private localStorage: LocalStorageService
  ) {}

  authenticate(login: string, password: string): Observable<boolean> {
    console.log('Sending request...');
    return new Observable<boolean>((subscriber) => {
      this.api
        .post<AuthResponse>(this.serviceEndpoint, {
          username: login,
          password: password,
        })
        .subscribe({
          next: (data) => {
            let user = new User(login, data.token, data.expiration);
            this.api.setToken(user.token);
            this.localStorage.set('login', user.login);
            this.localStorage.set('token', user.token);
            this.localStorage.set(
              'tokenExpirationDate',
              user.tokenExpirationDate.toString()
            );
            this.currentUserSubject.next(user);
            subscriber.next(true);
            subscriber.complete();
          },
          error: (error) => {
            subscriber.next(false);
            subscriber.complete();
          },
        });
    });
  }

  restoreAuthentication(): boolean {
    console.log('Restore auth');
    let login = this.localStorage.get('login');
    let token = this.localStorage.get('token');
    let tokenExpirationDate = this.localStorage.get('tokenExpirationDate');
    if (login !== null && token !== null && tokenExpirationDate !== null) {
      try {
        if (Date.parse(tokenExpirationDate) > Date.now()) {
          let user = new User(
            login,
            token,
            new Date(Date.parse(tokenExpirationDate))
          );
          this.api.setToken(user.token);
          this.currentUserSubject.next(user);
          return true;
        }
      } catch {}
    }
    return false;
  }
}

interface AuthResponse {
  token: string;
  expiration: Date;
}
