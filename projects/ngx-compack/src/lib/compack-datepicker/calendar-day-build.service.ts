import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CalendarDayBuildService {

  constructor() { }

  // получение дней в выбранном месяце
  public static getAllDayMonth(month: number, year: number, locale: string,): Moment[] {
    moment.locale(locale);

    let result: Moment[] = [];

    // const year = moment(month, 'M').year();
    const dateStart = moment().year(year).month(month).date(0).startOf('month');
    const dateEnd = moment().year(year).month(month).date(0).endOf('month').hour(0).minute(0).second(0);
    // console.log('first day of month', dateStart);
    // console.log('last day of month', dateEnd);

    result = this.recursAddAllDayOfStartWeek(result, moment(dateStart));

    const numberOfDays = moment.duration(dateEnd.diff(dateStart)).days();
    // console.log('count days in month', numberOfDays);

    let i = 1;
    while (i < numberOfDays) {
      result.push(moment(dateStart.add(1, 'day')));
      i++;
    }

    result = this.recursAddAllDayOfEndWeek(result, moment(dateEnd));

    while (result.length < 42) {
      result = this.recursAddAllDayOfEndWeek(result, moment(result[result.length - 1]).add(1, 'day'));
    }

    // console.log('res arr day', result);
    return result;
  }



  // рекурсивное получение дней нчала месяца
  public static recursAddAllDayOfStartWeek(arr: Moment[], date: Moment): Moment[] {
    if (date.weekday() !== 0) {
      arr.unshift(moment(date));
      arr = this.recursAddAllDayOfStartWeek(arr, moment(date.add(-1, 'day')));
    } else {
      arr.unshift(moment(date));
    }
    return arr;
  }


  // рекурсивное получение дней конца месяца
  public static recursAddAllDayOfEndWeek(arr: Moment[], date: Moment): Moment[] {
    if (date.weekday() !== 6) {
      arr.push(moment(date));
      arr = this.recursAddAllDayOfEndWeek(arr, moment(date.add(1, 'day')));
    } else {
      arr.push(moment(date));
    }
    return arr;
  }


}
