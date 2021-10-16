import { Injectable } from '@angular/core';
import { Observable, ObservableInput, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = `${environment.apiUrl}/api`;
  private token = '';

  constructor(private http: HttpClient) {}

  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authentication: `Bearer ${this.token}`,
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

  setToken(token: string) {
    this.token = token;
  }

  handleError(error: any): ObservableInput<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
