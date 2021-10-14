import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated: boolean = false;

  private apiUrl = 'http://localhost:3000/api/auth';
  private token = '';

  private authOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  auth(login: string, password: string): Observable<boolean> {
    const observable = new Observable<boolean>(subscriber => {
      this.http.post<any>(this.apiUrl, JSON.stringify({ 'username': login, 'password': password}), this.authOptions).subscribe({
        next: data => {
          subscriber.next(true);
          subscriber.complete();
        },
        error: error => {
          subscriber.next(false);
          subscriber.complete();
        }
      })
    });

    return observable;
  }
}
