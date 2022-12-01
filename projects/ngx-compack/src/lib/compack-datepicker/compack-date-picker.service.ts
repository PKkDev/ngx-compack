import { Injectable } from '@angular/core';
import { CalendarDayBuildService } from './calendar-day-build.service';
import { DateFormatService } from './date-format.service';
import { CalendarPicker } from './model/calendar';
import { CalendarDayPicker } from './model/calendar-day';
import { CompackRelativeDateModel } from './model/compack-relative-date-model';
import { MonthSelect } from './model/month-select';
import { CalendareError, TypePickerError } from './model/type-picker-error';


import dateFormat from './test'

@Injectable({
  providedIn: 'root'
})
export class CompackDatePickerService {

  constructor(private dfs: DateFormatService) { }

  /**
   * get month name
   * @param month 
   * @param locale 
   * @returns 
   */
  public getNameMonth(month: number, locale: string): string {
    const now = new Date();
    const nowYear = now.getFullYear();
    let date = new Date(nowYear, month, 1);
    return date.toLocaleString(locale, { month: 'long' });
  }

  /**
   * get all months
   * @param locale 
   * @returns 
   */
  public getMonths(locale: string): MonthSelect[] {
    const now = new Date();
    const nowYear = now.getFullYear();
    const result: MonthSelect[] = [];
    for (let i = 0; i < 12; i++)
      result.push(new MonthSelect(i, (new Date(nowYear, i, 1)).toLocaleString(locale, { month: 'long' })))
    return result;
  }

  /**
   * get day of week names
   * @param week CalendarDayPicker[]
   * @param locale string
   * @returns 
   */
  public getNameDayOfWeek(week: CalendarDayPicker[], locale: string): string[] {
    const arrName: string[] = [];
    for (const day of week)
      if (day.fulDate)
        arrName.push(day.fulDate.toLocaleString(locale, { weekday: 'short' }));
    return arrName;
  }

  public getDayByDate(mDate: Date, calendar: CalendarPicker[]): CalendarDayPicker | null {
    const numberDay = mDate.getDate();
    for (let row of calendar)
      for (let cell of row.week)
        if (cell.numberDay == numberDay && cell.isDayThisMonth)
          return cell;
    return null;
  }

  public getWeeksForCalendar(month: number, year: number, locale: string, selectStartDate?: CalendarDayPicker, selectLastDate?: CalendarDayPicker, max?: Date, min?: Date): CalendarPicker[] {

    let listDay: Date[] = CalendarDayBuildService.getAllDayMonth(month, year, locale);

    const todayT = new Date();
    const today = new Date(todayT.getFullYear(), todayT.getMonth(), todayT.getDate());

    const now = new Date(year, month, 1);
    const nowYear = now.getFullYear();

    let calendar: CalendarPicker[] = [];
    let y = 0;
    for (let i = 0; i < 6; i++) {
      calendar.push({ week: [] });
      const maxDayInWeek = y + 7;
      while (y < maxDayInWeek) {
        const dayMonth = listDay[y].getMonth();
        const isDayThisMonth = month == dayMonth;
        calendar[i].week.push({
          numberDay: listDay[y].getDate(),
          fulDate: listDay[y],
          isDayThisMonth: isDayThisMonth,
          isDayThisYear: nowYear === listDay[y].getFullYear(),
          isDayToday: today.getTime() == listDay[y].getTime(),
          isSelected: this.checkSelectedDate(listDay[y], isDayThisMonth, selectStartDate, selectLastDate),
          isIncludeRage: this.checkDayInRange(listDay[y], selectStartDate, selectLastDate) && isDayThisMonth,
          isIncludeTempoRage: false,
          isOutOfMaxMin: this.checkOutMaxMin(listDay[y], max, min)
        });
        y++;
      }
    }

    listDay = [];

    return calendar;
  }

  public updateCalendarState(calendar: CalendarPicker[], selectStartDate?: CalendarDayPicker, selectLastDate?: CalendarDayPicker, max?: Date, min?: Date) {
    for (let row of calendar) {
      for (let cell of row.week) {
        const date = cell.fulDate;
        cell.isSelected = this.checkSelectedDate(date, cell.isDayThisMonth, selectStartDate, selectLastDate);
        cell.isIncludeRage = this.checkDayInRange(date, selectStartDate, selectLastDate) && cell.isDayThisMonth;
        cell.isIncludeTempoRage = false;
        cell.isOutOfMaxMin = this.checkOutMaxMin(date, max, min);
      }
    }
  }

  private checkDayInRange(day: Date, selectStartDate?: CalendarDayPicker, selectLastDate?: CalendarDayPicker): boolean {
    const checkAfter = selectStartDate ? day > selectStartDate.fulDate : false;
    const checkBefore = selectLastDate ? day < selectLastDate.fulDate : false;
    return checkAfter && checkBefore;
  }

  public cleareRnge(calendar: CalendarPicker[]) {
    for (const cal of calendar)
      for (const day of cal.week)
        day.isIncludeRage = false;
  }


  private checkSelectedDate(fulDateView: Date, nowMonth: boolean, selectStartDate?: CalendarDayPicker, selectLastDate?: CalendarDayPicker): boolean {
    let selectedStart = false;
    let selectedEnd = false;
    if (selectStartDate != null) {
      const tempo = new Date(selectStartDate.fulDate);
      tempo.setHours(0);
      tempo.setMinutes(0);
      selectedStart = (tempo.getTime() === fulDateView.getTime() && nowMonth);
    }
    if (selectLastDate != null) {
      const tempo = new Date(selectLastDate.fulDate);
      tempo.setHours(0);
      tempo.setMinutes(0);
      selectedEnd = (tempo.getTime() === fulDateView.getTime() && nowMonth);
    }
    return selectedStart || selectedEnd;
  }

  private checkOutMaxMin(fulDateView: Date, max?: Date, min?: Date): boolean {
    const outMax = max ? max < fulDateView : false;
    const outMin = min ? min > fulDateView : false;
    return outMax || outMin;
  }

  public selectAllRowIncludeInRange(calendar: CalendarPicker[], selectStartDate: CalendarDayPicker, selectLastDate: CalendarDayPicker, isTempo: boolean): CalendarPicker[] {
    for (const cal of calendar) {
      for (const day of cal.week) {
        const checkAfter = day.fulDate > selectStartDate.fulDate;
        const checkBefore = day.fulDate < selectLastDate.fulDate;
        if (checkAfter && checkBefore && day.isDayThisMonth) {
          if (isTempo) day.isIncludeTempoRage = true;
          else day.isIncludeRage = true;
        }
      }
    }
    return calendar;
  }

  public selectAllRowIncludeInTempoRange(calendar: CalendarPicker[], selectStartDate: CalendarDayPicker, selectLastDate: CalendarDayPicker) {
    for (const cal of calendar) {
      for (const day of cal.week) {
        const checkAfter = day.fulDate > selectStartDate.fulDate;
        const checkBefore = day.fulDate < selectLastDate.fulDate;
        if (checkAfter && checkBefore && day.isDayThisMonth) {
          day.isIncludeTempoRage = true;
        }
      }
    }
  }
  public cleareTempoRange(calendar: CalendarPicker[]) {
    for (const cal of calendar)
      for (const day of cal.week)
        day.isIncludeTempoRage = false;
  }

  public checkInputError(startDate: CalendarDayPicker, endDate: CalendarDayPicker, locale: string, maxChoseDay?: number): CalendareError {
    const result = new CalendareError();

    if (endDate.fulDate < startDate.fulDate) {
      result.errorMessage = this.setErrorMessageByType(TypePickerError.StartAfterEnd, locale)
      result.isError = true;
    }

    if (startDate.isOutOfMaxMin || endDate.isOutOfMaxMin) {
      result.errorMessage = this.setErrorMessageByType(TypePickerError.OutOfMaxMin, locale);
      result.isError = true;
    }

    if (maxChoseDay) {
      let duration = endDate.fulDate.getDate() - startDate.fulDate.getDate();
      duration = duration >= 1 ? duration + 1 : duration;
      if (duration > maxChoseDay - 1) {
        result.errorMessage = this.setErrorMessageByType(TypePickerError.MaxChooseDay, locale)
        result.isError = true;
      }
    }

    return result;
  }

  private setErrorMessageByType(type: TypePickerError, locale: string): string {
    switch (type) {
      case TypePickerError.None: return '';
      case TypePickerError.OutOfMaxMin: return locale.includes('ru') ? 'выход за макс/мин' : 'out of max/min';
      case TypePickerError.MaxChooseDay: return locale.includes('ru') ? 'вне диапазона' : 'out of range';
      case TypePickerError.StartAfterEnd: return locale.includes('ru') ? 'старт > конец' : 'start > end';
      default: return '';
    }
  }

  public getHourFromTimeStr(time: string): number {
    return +time.split(':')[0];
  }
  public getMinFromTimeStr(time: string): number {
    return +time.split(':')[1];
  }

  public getDateFromInputDateStr(inpuDate: string): Date | null {
    //'dd.mm.yyyy' -> 'yyyy-mm-dd'
    // in Date month start with 0 -> -1
    var arr = inpuDate.split('.');
    var date = new Date(+arr[2], +arr[1] - 1, +arr[0], 0, 0, 0, 0);
    if (date.toString() === 'Invalid Date') return null;
    // if (!!isNaN(date.valueOf())) return null;
    return date;
  }

  public getDefaoultRelativeDates(locale: string): CompackRelativeDateModel[] {
    return [
      {
        title: locale.trim().toLocaleLowerCase() == 'ru' ? 'сегодня' : 'today',
        dateStartFunc: () => new Date(new Date().setHours(0, 0, 0, 0)),
        dateEndFunc: () => new Date(new Date().setHours(0, 0, 0, 0))
      },
      {
        title: locale.trim().toLocaleLowerCase() == 'ru' ? 'вчера' : 'yeaterday',
        dateStartFunc: () => {
          const date = new Date(new Date().setHours(0, 0, 0, 0));
          date.setDate(date.getDate() - 1);
          return date;
        },
        dateEndFunc: () => {
          const date = new Date(new Date().setHours(0, 0, 0, 0));
          date.setDate(date.getDate() - 1);
          return date;
        }
      },
      {
        title: locale.trim().toLocaleLowerCase() == 'ru' ? 'последние 7 дней' : 'last 7 day',
        dateStartFunc: () => {
          const date = new Date(new Date().setHours(0, 0, 0, 0));
          date.setDate(date.getDate() - 7);
          return date;
        },
        dateEndFunc: () => new Date(new Date().setHours(0, 0, 0, 0))
      },
      {
        title: locale.trim().toLocaleLowerCase() == 'ru' ? 'последние 30 дней' : 'last 30 day',
        dateStartFunc: () => {
          const date = new Date(new Date().setHours(0, 0, 0, 0));
          date.setDate(date.getDate() - 30);
          return date;
        },
        dateEndFunc: () => new Date(new Date().setHours(0, 0, 0, 0))
      },
      {
        title: locale.trim().toLocaleLowerCase() == 'ru' ? 'этот месяц' : 'this month',
        dateStartFunc: () => {
          const date = new Date();
          let start = new Date(date.getFullYear(), date.getMonth(), 1);
          return start;
        },
        dateEndFunc: () => {
          const date = new Date();
          let end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
          return end;
        }
      }
    ];
  }


}
