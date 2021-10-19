import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { User } from './User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new Subject<User>();
  private endpoint: string = '/auth';

  get user(): Subject<User> {
    return this.userSubject;
  }
  constructor(private api: ApiService) {}

  auth(login: string, password: string): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      this.api
        .post<AuthResponse>(this.endpoint, {
          username: login,
          password: password,
        })
        .subscribe({
          next: (data) => {
            this.userSubject.next(new User(login, data.token));
            this.api.setToken(data.token);
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
}

interface AuthResponse {
  token: string;
}
