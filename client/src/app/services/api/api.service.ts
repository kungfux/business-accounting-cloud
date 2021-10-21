import { Injectable } from '@angular/core';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = `${environment.apiUrl}/api`;

  constructor(
    private http: HttpClient,
    private userPreferences: UserPreferencesService
  ) {
    this.userPreferences.userPreferencesSubject.subscribe(() => {
      this.setToken(this.userPreferences.token);
    });
  }

  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  get<T>(api: string): Observable<T> {
    return this.http
      .get<T>(`${this.url}${api}`, this.headers)
      .pipe(catchError(this.handleError));
  }

  post<T>(api: string, payload: object): Observable<T> {
    return this.http
      .post<T>(`${this.url}${api}`, JSON.stringify(payload), this.headers)
      .pipe(catchError(this.handleError));
  }

  put<T>(api: string, payload: object): Observable<T> {
    return this.http
      .put<T>(`${this.url}${api}`, JSON.stringify(payload), this.headers)
      .pipe(catchError(this.handleError));
  }

  delete<T>(api: string): Observable<T> {
    return this.http
      .delete<T>(`${this.url}${api}`, this.headers)
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
      switch (error.status) {
        case 0:
          errorMessage = 'Сервер недоступен';
          break;
        case 400:
          errorMessage = 'Неверная операция';
          break;
        case 401:
          errorMessage =
            'Вы указали неверный логин/пароль или время сессии истекло и необходимо выполнить вход повторно';
          this.userPreferences.resetUser();
          break;
        default:
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          break;
      }
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
