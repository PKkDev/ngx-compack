import { Pipe, PipeTransform } from '@angular/core';
import * as moment_ from 'moment';

const moment = moment_;

@Pipe({
  name: 'displayPeriodDate',
  pure: false
})
export class DisplayPeriodDatePipe implements PipeTransform {

  transform(value: string[], formatInputDate: string, formatView?: string): string {

    if (value === null) {
      return '';
    }

    let formatDate = 'DD.MM.YYYY';
    if (formatView !== undefined) {
      formatDate = formatView;
    }

    let str = 'период с/по';
    if (value.length == 0) {
      return str;
    }

    if (value.length > 0) {
      if (value[0] === 'reset') {
        return str;
      }
    }

    const strDateStart = moment(value[0], formatInputDate).format(formatDate);

    if (value[1] === 'reset' || value.length == 1) {
      str = strDateStart + ' - '
      return str;
    }

    const strDateEnd = moment(value[1], formatInputDate).format(formatDate);
    str = strDateStart + ' - ' + strDateEnd;

    return str;
  }


}
