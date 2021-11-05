import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  convertToUtcDateOnly(value: Date): Date {
    let date = value;
    if (value.toString().endsWith('Z')) {
      date = new Date(value);
    }
    return new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
        0,
        0,
        0
      ) - date.getTimezoneOffset()
    );
  }
}
