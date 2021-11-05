import { Pipe, PipeTransform } from '@angular/core';
import { Expenditure } from '../services/api/models/expenditure';

@Pipe({ name: 'expenditure' })
export class ExpenditurePipe implements PipeTransform {
  transform(expenditure: Expenditure[], id: number): string | null | undefined {
    return expenditure.find((x) => x.id == id)?.title;
  }
}
