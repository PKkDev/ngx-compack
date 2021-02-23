import { Injectable } from '@angular/core';
import * as moment_ from 'moment';
import { Moment } from 'moment';
import { CalendarDayBuildService } from '../calendar-day-build.service';
import { CalendarPicker } from '../model/calendar';
import { CalendarDayPicker } from '../model/calendar-day';

const moment = moment_;

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

  getWeeksForCalendar(month: number, year: number, locale: string,
    selectStartDate?: CalendarDayPicker, selectLastDate?: CalendarDayPicker, max?: string, min?: string): CalendarPicker[] {
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
          isOutOfMaxMin: this.checkOutMaxMin(fulDateView, max, min)
        });
        y++;
      }
    }

    // console.log('res arr day', calendar);
    if (selectStartDate != undefined && selectLastDate != undefined)
      calendar = this.selectAllRowIncludeInRange(calendar, selectStartDate, selectLastDate);
    listDay = [];
    return calendar;
  }

  private checkNowMonth(month: number, monthView: number): boolean {
    return month === monthView;
  }

  private checkSelectedDate(
    fulDateView: string, nowMonth: boolean,
    selectStartDate?: CalendarDayPicker, selectLastDate?: CalendarDayPicker): boolean {
    // if (selectStartDate != undefined && selectLastDate != undefined) {
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
    // }
    return false;
  }

  private checkOutMaxMin(fulDateView: string, max?: string, min?: string): boolean {
    let outMax = false;
    let outMin = false;
    if (max != undefined) {
      const check = moment(max).isBefore(moment(fulDateView, 'D.M.YY'), 'day');
      outMax = (check);
    }
    if (min != undefined) {
      const check = moment(min).isAfter(moment(fulDateView, 'D.M.YY'), 'day');
      outMin = (check);
    }
    return outMax || outMin;
  }

  selectAllRowIncludeInRange(
    calendar: CalendarPicker[],
    selectStartDate?: CalendarDayPicker, selectLastDate?: CalendarDayPicker): CalendarPicker[] {
    if (selectLastDate !== undefined && selectStartDate !== undefined) {
      const checkStartDate = moment(selectStartDate.fulDate);
      const checkLastDate = moment(selectLastDate.fulDate);
      for (const cal of calendar) {
        for (const day of cal.week) {
          const checkDate = day.fulDate;
          const checkAfter = moment(checkDate).isAfter(checkStartDate);
          const checkBefore = moment(checkDate).isBefore(checkLastDate, 'day');
          if (checkAfter && checkBefore && day.isDayThisMonth) {
            day.isIncludeRage = true;
          }
        }
      }
    }
    return calendar;
  }


}
