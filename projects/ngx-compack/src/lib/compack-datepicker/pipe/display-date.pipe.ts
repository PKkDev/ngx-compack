import { Pipe, PipeTransform } from '@angular/core';
import * as moment_ from 'moment';
import { CalendarDay } from '../model/calendar-day';

const moment = moment_;

@Pipe({
  name: 'displayDate',
  pure: false
})
export class DisplayDatePipe implements PipeTransform {

  transform(value: CalendarDay, formatInputDate: string, formatView?: string): string {

    if (value === null) {
      return '';
    }

    let formatDate = 'DD.MM.YYYY';
    if (formatView !== undefined)
      formatDate = formatView;


    return ' ' + moment(value.fulDate, formatInputDate).format(formatView);
  }


}
