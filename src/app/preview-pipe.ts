import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preview',
  standalone: true
})
export class PreviewPipe implements PipeTransform {
  transform(value: string | null | undefined, limit = 100): string {
    if (!value) {
      return '';
    }
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}