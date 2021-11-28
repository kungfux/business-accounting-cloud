import { Pipe, PipeTransform } from '@angular/core';
import { Income } from '../services/api/models/income';

@Pipe({ name: 'income' })
export class IncomePipe implements PipeTransform {
  transform(incomes: Income[], id: number): string | null | undefined {
    return incomes.find((x) => x.id == id)?.title;
  }
}
