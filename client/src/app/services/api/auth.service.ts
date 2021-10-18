import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated: boolean = false;
  private endpoint: string = '/auth';

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
