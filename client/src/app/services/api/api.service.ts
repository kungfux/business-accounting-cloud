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
  private limit: number = 10;

  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private userPreferences: UserPreferencesService
  ) {
    this.userPreferences.userPreferencesSubject.subscribe(() => {
      this.setToken(this.userPreferences.token!);
      this.limit = userPreferences.limit;
    });
  }

  get defaultLimit() {
    return this.limit;
  }

  get maxLimit() {
    return 99;
  }

  get<T>({
    api,
    id,
    companyId,
    offset,
    limit,
    params,
  }: GetRequest): Observable<T> {
    const querystring = {
      ...(companyId && { companyId: companyId }),
      ...(offset && { offset: offset }),
      ...(limit && { limit: limit }),
      ...params,
    };

    const options: any = {
      headers: this.headers.headers,
      params: querystring,
    };

    const endpoint = !id ? `${this.url}${api}` : `${this.url}${api}/${id}`;
    return this.http
      .get<T>(endpoint, options)
      .pipe(catchError(this.handleError));
  }

  post<T>(api: string, payload: object): Observable<T> {
    return this.http
      .post<T>(`${this.url}${api}`, JSON.stringify(payload), this.headers)
      .pipe(catchError(this.handleError));
  }

  put<T>(api: string, id: number, payload: object): Observable<T> {
    return this.http
      .put<T>(`${this.url}${api}/${id}`, JSON.stringify(payload), this.headers)
      .pipe(catchError(this.handleError));
  }

  patch<T>(api: string, id: number, payload: object): Observable<T> {
    return this.http
      .patch<T>(
        `${this.url}${api}/${id}`,
        JSON.stringify(payload),
        this.headers
      )
      .pipe(catchError(this.handleError));
  }

  delete<T>(api: string, id: number): Observable<T> {
    return this.http
      .delete<T>(`${this.url}${api}/${id}`, this.headers)
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
          errorMessage = 'Сервер недоступен. Попробуйте повторить операцию';
          break;
        case 400:
          errorMessage = 'Неверная операция. Обратитесь к администратору';
          break;
        case 401:
          errorMessage =
            'Вы указали неверный логин/пароль или время сессии истекло и необходимо выполнить вход повторно';
          break;
        case 404:
          errorMessage = 'Запрашиваемые данные не найдены';
          break;
        case 413:
          errorMessage =
            'Сервер отклонил запрос из-за превышения лимита на обработку данных';
          break;
        case 422:
          errorMessage = 'Операция невозможна из-за неверно указанных данных';
          break;
        default:
          errorMessage = 'Что-то пошло не так. Обратитесь к администратору';
          break;
      }
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}

export interface GetRequest {
  api: string;
  id?: number;
  companyId?: number;
  limit?: number;
  offset?: number;
  params?: any;
}
