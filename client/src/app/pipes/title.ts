import { Pipe, PipeTransform } from '@angular/core';
import { Title } from '../services/api/models/title';

@Pipe({ name: 'title' })
export class TitlePipe implements PipeTransform {
  transform(titles: Title[], id: number): string | null | undefined {
    return titles.find((x) => x.id == id)?.name;
  }
}
