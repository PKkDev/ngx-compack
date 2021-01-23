import { Pipe, PipeTransform } from '@angular/core';
import * as moment_ from 'moment';
import { CalendarDayPicker } from '../model/calendar-day';

const moment = moment_;

@Pipe({
  name: 'displayPeriodDate',
  pure: false
})
export class DisplayPeriodDatePipe implements PipeTransform {

  transform(value: CalendarDayPicker[], formatView: string): string {

    //let str = 'период с/по';
    let str = 'from/to';

    if (value === null || value.length == 0 || (value.length > 0 && value[0] == undefined)) {
      return str;
    }

    let formatDate = 'DD.MM.YYYY';
    if (formatView !== undefined) {
      formatDate = formatView;
    }

    const strDateStart = moment(value[0].fulDate).format(formatDate);

    if (value[1] === undefined) {
      str = strDateStart + ' - '
      return str;
    }

    const strDateEnd =  moment(value[1].fulDate).format(formatDate);
    str = strDateStart + ' - ' + strDateEnd;

    return str;
  }


}
