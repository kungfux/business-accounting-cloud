import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DialogComponent } from '../components/dialogs/dialog/dialog.component';
import { LoginApiService } from '../services/api/login.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private isDialogOpen: Boolean = false;

  constructor(
    public dialog: DialogComponent,
    private router: Router,
    private login: LoginApiService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = error.message;
        switch (error.status) {
          case 0:
            errorMessage =
              'Сервер недоступен. Попробуйте повторить операцию позже';
            break;
          case 400:
            errorMessage =
              'Неверная операция. Пожалуйста, обратитесь к администратору';
            break;
          case 401:
            if (this.router.url !== '/login') {
              errorMessage =
                'Время сессии истекло. Пожалуйста, выполните вход повторно';
            } else {
              errorMessage = 'Вы указали неверный логин или пароль';
            }
            break;
          case 404:
            errorMessage = 'Запрашиваемые данные не найдены';
            break;
          case 413:
            errorMessage =
              'Превышен лимит на обработку данных. Попробуйте использовать файл меньшего размера';
            break;
          case 422:
            errorMessage = 'Операция невозможна из-за неверно указанных данных';
            break;
          default:
            errorMessage =
              'Что-то пошло не так. Пожалуйста, обратитесь к администратору';
            break;
        }

        if (!this.isDialogOpen) {
          this.isDialogOpen = true;
          const dialogClosed = this.dialog.showAlert('Внимание', errorMessage);
          dialogClosed.subscribe({
            next: () => {
              this.isDialogOpen = false;
            },
          });
          if (error.status === 401) {
            dialogClosed.subscribe({
              next: () => {
                this.login.logout();
                this.router.navigate(['/login']);
              },
            });
          }
        }
        return throwError(error);
      })
    );
  }
}
