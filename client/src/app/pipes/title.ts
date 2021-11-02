import { Pipe, PipeTransform } from '@angular/core';
import { Title } from '../services/api/models/title';

@Pipe({ name: 'title' })
export class TitlePipe implements PipeTransform {
  transform(value: Title[], title: number): string | null | undefined {
    return value.find((x) => x.id == title)?.name;
  }
}
