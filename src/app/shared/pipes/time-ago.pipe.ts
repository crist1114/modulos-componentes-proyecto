import { Pipe, PipeTransform } from '@angular/core';
import formatDistance from 'date-fns/formatDistance'

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date): string {
    return formatDistance(new Date(), value);
  }

}
