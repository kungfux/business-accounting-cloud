import { Injectable } from '@angular/core';
import { UserPreferencesService } from '../userPreferences.service';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private userPreferences: UserPreferencesService) {}

  convert(value: number): string {
    switch (this.userPreferences.locale) {
      case 'ru':
        return value + ' руб.';
      case 'ru-UA':
        return value + ' грн.';
      case 'en-US':
        return '$ ' + value;
    }
    return '$ ' + value;
  }

  getSymbol(): string {
    switch (this.userPreferences.locale) {
      case 'ru':
        return 'руб.';
      case 'ru-UA':
        return 'грн.';
      case 'en-US':
        return '$';
    }
    return '$';
  }
}
