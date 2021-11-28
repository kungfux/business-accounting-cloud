import { Pipe, PipeTransform } from '@angular/core';
import { Property } from '../services/api/models/property';

@Pipe({ name: 'property' })
export class PropertyPipe implements PipeTransform {
  transform(properties: Property[], id: number): string | null | undefined {
    return properties.find((x) => x.id == id)?.title;
  }
}
