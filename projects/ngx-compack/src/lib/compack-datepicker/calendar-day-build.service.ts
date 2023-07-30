import { Injectable } from '@angular/core';

@Injectable()
export class CalendarDayBuildService {
 
  /**
   * get all dayes in month
   * @param month number of month
   * @param year number of year
   * @param locale locale
   * @returns 
   */
  public static getAllDayMonth(month: number, year: number, locale: string): Date[] {

    let result: Date[] = [];

    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);

    let numberOfDays = end.getDate() - start.getDate();
    numberOfDays = numberOfDays >= 1 ? numberOfDays + 1 : numberOfDays;

    const indexStartWeek = locale == 'ru' ? 1 : 0;
    const prevStart = new Date(start);
    prevStart.setDate(prevStart.getDate() - 1);
    result = this.recursAddAllDayOfStartWeek(result, prevStart, indexStartWeek);

    let i = 1;
    while (i <= numberOfDays) {
      const tempoDate = new Date(year, month, i);
      result.push(tempoDate);
      i++;
    }

    const indexEndWeek = locale == 'ru' ? 0 : 6;

    const nextEnd = new Date(end);
    nextEnd.setDate(nextEnd.getDate() + 1);
    result = this.recursAddAllDayOfEndWeek(result, nextEnd, indexEndWeek);

    while (result.length < 42) {
      const nextEnd = new Date(result[result.length - 1]);
      nextEnd.setDate(nextEnd.getDate() + 1);
      result = this.recursAddAllDayOfEndWeek(result, nextEnd, indexEndWeek);
    }

    return result;

  }

  /**
 * recursively getting the days of the start of the month
 * @param arr Date[]
 * @param date Date
 * @param indexStartWeek number
 * @returns Date[]
 */
  public static recursAddAllDayOfStartWeek(arr: Date[], date: Date, indexStartWeek: number): Date[] {
    if (date.getDay() !== indexStartWeek) {
      arr.unshift(date);
      const prev = new Date(date);
      prev.setDate(prev.getDate() - 1);
      arr = this.recursAddAllDayOfStartWeek(arr, prev, indexStartWeek);
    }
    else arr.unshift(date);
    return arr;
  }

  /**
 * recursively getting the days of the end of the month
 * @param arr Date[]
 * @param date Date
 * @param indexEndWeek number
 * @returns Date[]
 */
  public static recursAddAllDayOfEndWeek(arr: Date[], date: Date, indexEndWeek: number): Date[] {
    if (date.getDay() !== indexEndWeek) {
      arr.push(date);
      const next = new Date(date);
      next.setDate(next.getDate() + 1);
      arr = this.recursAddAllDayOfEndWeek(arr, next, indexEndWeek);
    }
    else arr.push(date);
    return arr;
  }
}
