import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { CalendarDayBuildService } from '../calendar-day-build.service';
import { CalendarPicker } from '../model/calendar';
import { CalendarDayPicker } from '../model/calendar-day';
import { MonthSelect } from '../model/month-select';
import { CalendareError, TypePickerError } from '../model/type-picker-error';

@Injectable({
  providedIn: 'root'
})
export class CompackDatePickerService {

  constructor() { }

  // получение названия выбранного месяца
  getNameMonth(month: number, locale: string): string {
    moment.locale(locale);
    return moment(month, 'M').format('MMMM');
  }

  // получение названия всех месяцов
  getMonths(locale: string): MonthSelect[] {
    moment.locale(locale);
    const result: MonthSelect[] = [];
    for (let i = 1; i <= 12; i++) {
      result.push(new MonthSelect(i, moment(i, 'M').format('MMM')))
    }
    return result;
  }

  // получение списка названий дней недели
  getNameDayOfWeek(locale: string): string[] {
    moment.locale(locale);
    let i = 0;
    const arrName: string[] = [];
    while (i <= 6) {
      arrName.push(moment().weekday(i).format('dd'));
      i++;
    }
    return arrName;
  }

  getDayByDate(mDate: Moment, calendar: CalendarPicker[]): CalendarDayPicker | null {

    const numberDay = +mDate.format('D');
    for (let row of calendar) {
      for (let cell of row.week) {
        if (cell.numberDay == numberDay && cell.isDayThisMonth)
          return cell;
      }
    }

    return null;
  }

  getWeeksForCalendar(month: number, year: number, locale: string,
    selectStartDate?: CalendarDayPicker, selectLastDate?: CalendarDayPicker, max?: Moment, min?: Moment): CalendarPicker[] {
    moment.locale(locale);

    let listDay: Moment[] = CalendarDayBuildService.getAllDayMonth(month, year, locale);
    // console.log('listDay', listDay);

    let calendar: CalendarPicker[] = [];
    const numYearNow = +moment().year();
    let y = 0;
    for (let i = 0; i < 6; i++) {
      calendar.push({ week: [] });
      const maxDayInWeek = y + 7;
      while (y < maxDayInWeek) {
        const monthView = +listDay[y].month() + 1;
        const fulDateView = moment(listDay[y], 'D.M.YY').format('D.M.YY');
        const nowMonth = this.checkNowMonth(month, monthView);
        calendar[i].week.push({
          numberDay: +moment(listDay[y], 'D.M.YY').format('D'),
          fulDate: listDay[y],
          isDayThisMonth: nowMonth,
          isDayThisYear: numYearNow === +moment(listDay[y]).year(),
          isDayToday: moment().format('D.M.YY') === fulDateView && +month === +monthView,
          isSelected: this.checkSelectedDate(fulDateView, nowMonth, selectStartDate, selectLastDate),
          isIncludeRage: false,
          isIncludeTempoRage: false,
          isOutOfMaxMin: this.checkOutMaxMin(fulDateView, max, min)
        });
        y++;
      }
    }

    // console.log('res arr day', calendar);
    if (selectStartDate != undefined && selectLastDate != undefined)
      calendar = this.selectAllRowIncludeInRange(calendar, selectStartDate, selectLastDate, false);
    listDay = [];
    return calendar;
  }

  private checkNowMonth(month: number, monthView: number): boolean {
    return month === monthView;
  }

  private checkSelectedDate(
    fulDateView: string, nowMonth: boolean,
    selectStartDate?: CalendarDayPicker, selectLastDate?: CalendarDayPicker): boolean {
    let selectedStart = false;
    let selectedEnd = false;
    if (selectStartDate != null) {
      const fulDateStartSelected = moment(selectStartDate.fulDate, 'D.M.YY').format('D.M.YY');
      selectedStart = (fulDateStartSelected === fulDateView && nowMonth);
    }
    if (selectLastDate != null) {
      const fulDateEndSelected = moment(selectLastDate.fulDate, 'D.M.YY').format('D.M.YY');
      selectedEnd = (fulDateEndSelected === fulDateView && nowMonth);
    }
    return selectedStart || selectedEnd;
  }

  private checkOutMaxMin(fulDateView: string, max?: Moment, min?: Moment): boolean {
    const outMax = max ? moment(max).isBefore(moment(fulDateView, 'D.M.YY'), 'day') : false;
    const outMin = min ? moment(min).isAfter(moment(fulDateView, 'D.M.YY'), 'day') : false;
    return outMax || outMin;
  }

  public selectAllRowIncludeInRange(
    calendar: CalendarPicker[], selectStartDate: CalendarDayPicker, selectLastDate: CalendarDayPicker, isTempo: boolean): CalendarPicker[] {
    // console.log('range from/to:', selectStartDate, selectLastDate);
    const checkStartDate = moment(selectStartDate.fulDate);
    const checkLastDate = moment(selectLastDate.fulDate);
    for (const cal of calendar) {
      for (const day of cal.week) {
        const checkDate = day.fulDate;
        const checkAfter = moment(checkDate).isAfter(checkStartDate);
        const checkBefore = moment(checkDate).isBefore(checkLastDate, 'day');
        if (checkAfter && checkBefore && day.isDayThisMonth) {
          if (isTempo)
            day.isIncludeTempoRage = true;
          else
            day.isIncludeRage = true;
        }
      }
    }
    return calendar;
  }

  public checkInputError(
    startDate: CalendarDayPicker, endDate: CalendarDayPicker, locale: string, maxChoseDay?: number): CalendareError {
    const result = new CalendareError();

    if (endDate.fulDate?.isBefore(startDate.fulDate)) {
      result.errorMessage = this.setErrorMessageByType(TypePickerError.StartAfterEnd, locale)
      result.isError = true;
    }

    if (startDate.isOutOfMaxMin || endDate.isOutOfMaxMin) {
      result.errorMessage = this.setErrorMessageByType(TypePickerError.OutOfMaxMin, locale);
      result.isError = true;
    }

    if (maxChoseDay) {
      const duration = moment.duration(endDate.fulDate?.diff(startDate.fulDate));
      if (duration.days() > maxChoseDay - 1) {
        result.errorMessage = this.setErrorMessageByType(TypePickerError.MaxChooseDay, locale)
        result.isError = true;
      }
    }

    return result;
  }

  public setErrorMessageByType(type: TypePickerError, locale: string): string {
    let error = '';
    switch (type) {
      case TypePickerError.None: {
        error = '';
        break;
      }
      case TypePickerError.OutOfMaxMin: {
        if (locale.includes('ru'))
          error = 'выход за макс/мин';
        else
          error = 'out of max/min';
        break;
      }
      case TypePickerError.MaxChooseDay: {
        if (locale.includes('ru'))
          error = 'вне диапазона';
        else
          error = 'out of range';
        break;
      }
      case TypePickerError.StartAfterEnd: {
        if (locale.includes('ru'))
          error = 'старт > конец';
        else
          error = 'start > end';
        break;
      }
    }
    return error;
  }


}
