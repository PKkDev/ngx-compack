import { Pipe, PipeTransform } from '@angular/core';
import { CalendarDayPicker } from '../model/calendar-day';

import * as moment_ from 'moment';
const moment = moment_;

@Pipe({
  name: 'displayPeriodDate',
  pure: false,
})
export class DisplayPeriodDatePipe implements PipeTransform {

  transform(value: (CalendarDayPicker | undefined)[], rangeMode: boolean, placeHolder: string, useTime: boolean): string {

    if (value[0])
      value[0].isDayToday = true;

    let str = placeHolder;

    if (value === null || value.length == 0 || (value.length > 0 && value[0] == undefined)) {
      return str;
    }

    let formatDate = useTime ? 'DD.MM.YYYY HH:mm' : 'DD.MM.YYYY';

    if (rangeMode) {

      const strDateStart = moment(value[0]?.fulDate).format(formatDate);
      str = strDateStart + ' - '

      if (value[1] !== undefined) {
        const strDateEnd = moment(value[1].fulDate).format(formatDate);
        str = strDateStart + ' - ' + strDateEnd;
      }

    } else {
      str = moment(value[0]?.fulDate).format(formatDate);
    }

    return str;
  }


}
