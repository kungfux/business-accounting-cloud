import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { ApiService } from './api.service';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private serviceEndpoint: string = '/auth';

  constructor(
    private api: ApiService,
    private localStorage: LocalStorageService
  ) {}

  authenticate(login: string, password: string): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      this.api
        .post<AuthResponse>(this.serviceEndpoint, {
          username: login,
          password: password,
        })
        .subscribe({
          next: (data) => {
            let user = new User(login, data.token, data.expiration);
            this.localStorage.set(
              'auth',
              JSON.stringify({
                login: user.login,
                token: user.token,
                expiration: user.tokenExpirationDate,
              })
            );
            this.api.userSubject.next(user);
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
    let auth = this.localStorage.get('auth');
    if (auth !== null) {
      let json = JSON.parse(auth);
      let login = json.login;
      let token = json.token;
      let tokenExpirationDate = json.expiration;

      if (login !== null && token !== null && tokenExpirationDate !== null) {
        try {
          if (
            Date.parse(tokenExpirationDate) >
            Date.parse(new Date().toUTCString())
          ) {
            let user = new User(
              login,
              token,
              new Date(Date.parse(tokenExpirationDate))
            );
            this.api.userSubject.next(user);
            return true;
          }
        } catch {}
      }
    }

    return false;
  }
}

interface AuthResponse {
  token: string;
  expiration: Date;
}
