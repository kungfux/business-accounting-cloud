import { Injectable } from '@angular/core';
import { Observable, ObservableInput, Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = `${environment.apiUrl}/api`;
  private currentUserSubject = new Subject<User>();
  private currentUser: User = new User();

  get userSubject(): Subject<User> {
    return this.currentUserSubject;
  }

  constructor(private http: HttpClient) {
    this.userSubject.subscribe((user) => {
      this.currentUser = user;
      this.setToken(this.currentUser.token);
    });
  }

  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  get<T>(api: string): Observable<T> {
    console.log(JSON.stringify(this.headers.headers));
    return this.http
      .get<T>(`${this.url}${api}`, this.headers)
      .pipe(catchError(this.handleError));
  }

  post<T>(api: string, payload: object): Observable<T> {
    return this.http
      .post<T>(`${this.url}${api}`, JSON.stringify(payload), this.headers)
      .pipe(catchError(this.handleError));
  }

  setToken(token: string) {
    this.headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  handleError(error: any): ObservableInput<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      if (error.status === 401) {
        errorMessage =
          'Вы указали неверный логин/пароль или необходимо выполнить вход повторно.';
        // TODO: Cleanup auth token and route to login page
        this.currentUser = new User();
        this.currentUserSubject.next(this.currentUser);
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
