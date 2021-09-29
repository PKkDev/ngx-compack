import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, SimpleChange, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
// import * as moment_ from 'moment';
// import moment from 'moment'
import { Moment } from 'moment';
import { CalendarPicker } from '../model/calendar';
import { CalendarDayPicker } from '../model/calendar-day';
import { MonthSelect } from '../model/month-select';
import { CompackDatePickerService } from './compack-date-picker.service';

//const moment = moment_;
// const moment = require('moment');

export enum TypeError {
  None,
  OutOfMaxMin,
  StartAfterEnd,
  MaxChooseDay
}

@Component({
  selector: 'compack-date-picker',
  templateUrl: './compack-date-picker.component.html',
  styleUrls: ['./compack-date-picker.component.scss']
})
export class CompackDatePickerComponent implements OnInit, AfterViewInit {
  // inner configs
  public isError = false;
  public error = '';
  private baseFormat = 'DD.MM.YYYY';
  // events
  @Output() selectLastDateEvent = new EventEmitter<string[]>();
  // input config
  @Input() rangeMode = false;
  @Input() type = 'block'; /* block line icon */
  @Input() viewFieldSelectedDate = false;
  @Input() formatOutputDate: string | undefined;
  @Input() useTime = false;
  @Input() maxChoseDay: number | undefined;
  @Input() max: Moment | undefined;
  @Input() min: Moment | undefined;
  @Input() locale = 'en';
  // type template
  @ViewChild('lineTemplate', { static: false }) lineTemplate!: TemplateRef<any>;
  @ViewChild('blockTemplate', { static: false }) blockTemplate!: TemplateRef<any>;
  @ViewChild('iconTemplate', { static: false }) iconTemplate!: TemplateRef<any>;
  @ViewChild('picker', { static: false }) picker!: TemplateRef<any>;
  // view
  public fieldPlaceHolder = 'from/to';
  public acceptBtn = 'View';
  public cancelBtn = 'Reset';
  selectedMonth = moment().month() + 1;
  selectedYear = moment().year();
  nameMonth = '';
  public choseTemplate = this.blockTemplate;
  public menuIsVisiblr = false;
  public menuMonthIsVisible = false;
  // time
  public selectedHour = 0;
  public selectedMin = 0;
  // data
  public allMonth: MonthSelect[] = [];
  calendar: CalendarPicker[] = [];
  calendarWeekName: string[] = [];
  // select;
  selectStartDate: CalendarDayPicker | undefined;
  selectStartDateStr: string | undefined;

  selectLastDate: CalendarDayPicker | undefined;
  selectLastDateStr: string | undefined;

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private crdp: CompackDatePickerService) { }

  public onChangeSelectedStartDate() {
    if (this.selectStartDateStr) {

      const mDate = moment(this.selectStartDateStr, this.baseFormat);
      const year = mDate.year();
      const month = mDate.month() + 1;

      if (year && month) {
        this.selectedMonth = month;
        this.selectedYear = year;
        this.loadMonthData();
        const day = this.crdp.getDayByDate(mDate, this.calendar);
        if (day != null) {
          // if (!day.isOutOfMaxMin) {

          if (this.rangeMode)
            this.selectStartDayInRange(day, false);
          else
            this.selectSingleDay(day, false);
          // }
        }
      }
    }
  }

  public onChangeSelectedLastDate() {
    if (this.selectLastDateStr) {

      const mDate = moment(this.selectLastDateStr, this.baseFormat);
      const year = mDate.year();
      const month = mDate.month() + 1;

      if (year && month) {
        this.selectedMonth = month;
        this.selectedYear = year;
        this.loadMonthData();
        const day = this.crdp.getDayByDate(mDate, this.calendar);
        if (day != null) {
          //if (!day.isOutOfMaxMin)
          this.selectLastDayInRange(day, false);
        }
      }
    }
  }

  ngAfterViewInit() {
    this.loadCalendarTemplate(this.type);
  }

  ngOnInit() {
    this.clearCalendarSelected();
    this.calendarWeekName = this.crdp.getNameDayOfWeek(this.locale);
    this.setViewFormat();
    this.loadMonthData();
    this.setFields();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.type != undefined) {
      this.ngAfterViewInit();
    }
    if (changes.locale != undefined) {
      this.ngOnInit();
    }
    if (changes.min != undefined) {
      this.ngOnInit();
    }
    if (changes.max != undefined) {
      this.ngOnInit();
    }
    if (changes.rangeMode != undefined) {
      this.setFields();
    }
    if (changes.formatOutputDate != undefined) {
      this.setViewFormat();
    }
    if (changes.useTime != undefined) {
      this.baseFormat = this.useTime ? 'DD.MM.YYYY HH:mm' : 'DD.MM.YYYY';
      console.log(this.baseFormat);
    }
  }

  private setFields() {
    if (this.locale.includes('ru')) {
      this.fieldPlaceHolder = this.rangeMode ? 'от/до' : 'дата';
      this.acceptBtn = 'Принять';
      this.cancelBtn = 'Сбросить';
    }
    else {
      this.fieldPlaceHolder = this.rangeMode ? 'from/to' : 'date';
      this.acceptBtn = 'View';
      this.cancelBtn = 'Reset';
    }
  }

  private setViewFormat() {
    if (this.useTime && this.formatOutputDate == undefined)
      this.formatOutputDate = 'DD.MM.YYYY HH:mm';
    if (!this.useTime && this.formatOutputDate == undefined)
      this.formatOutputDate = 'DD.MM.YYYY';
  }

  private loadMonthData() {
    this.nameMonth = this.crdp.getNameMonth(this.selectedMonth, this.locale);
    this.calendar = this.crdp.getWeeksForCalendar(this.selectedMonth, this.selectedYear,
      this.locale, this.selectStartDate, this.selectLastDate, this.max, this.min);
  }

  @HostListener('document:click', ['$event'])
  public onClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target))
      this.menuIsVisiblr = false;
  }

  public changeHour() {
    if (this.selectedHour > 23)
      this.selectedHour = 0;

    if (this.selectedHour < 0)
      this.selectedHour = 23;

    if (this.selectLastDate !== undefined) {
      this.selectLastDate.fulDate?.hour(this.selectedHour);
    } else {
      if (this.selectStartDate !== undefined) {
        this.selectStartDate.fulDate?.hour(this.selectedHour);
      }
    }
  }

  public changeMin() {
    if (this.selectedMin > 59)
      this.selectedMin = 0;

    if (this.selectedMin < 0)
      this.selectedMin = 59;

    if (this.selectLastDate !== undefined) {
      this.selectLastDate.fulDate?.minute(this.selectedMin);
    } else {
      if (this.selectStartDate !== undefined) {
        this.selectStartDate.fulDate?.minute(this.selectedMin);
      }
    }
  }

  public loadCalendarTemplate(type: string) {
    switch (type) {
      case 'block': {
        this.choseTemplate = this.blockTemplate;
        break;
      }
      case 'line': {
        this.choseTemplate = this.lineTemplate;
        break;
      }
      case 'icon': {
        this.choseTemplate = this.iconTemplate;
        break;
      }
      default: {
        this.loadCalendarTemplate('block');
        break;
      }
    }
    this.cdr.detectChanges();
  }

  public openMenuPicker(element: HTMLElement) {
    this.menuIsVisiblr = !this.menuIsVisiblr;
    if (this.menuIsVisiblr) {
      element.style.cssText = 'display: block;'
      const rec = element?.getBoundingClientRect()
      // console.log(rec);

      const offsetLeft = element?.offsetLeft;
      const offsetTop = element?.offsetTop;
      const offsetHeight = element?.offsetHeight;
      const offsetWidth = element?.offsetWidth;

      // console.log('offsetLeft', offsetLeft, 'offsetTop', offsetTop, 'offsetHeight', offsetHeight, 'offsetWidth', offsetWidth);

      const innerHeight = window.innerHeight;
      const innerWidth = window.innerWidth;

      // console.log('innerHeight', innerHeight, 'innerWidth', innerWidth);

      // не влез снизу
      if (innerHeight - rec.bottom < 10) {
        const offset = rec.height + 10 + offsetTop;
        element.style.cssText = 'transform: translateY(-' + offset + 'px);'
      }

      // не влез справа
      if (innerWidth - rec.right < 10) {
        const offset = Math.abs(innerWidth - rec.right) + 25;
        const prevValue = element.style.transform;
        element.style.cssText = 'transform: ' + prevValue + ' translateX(-' + offset + 'px);'
      }

    }

  }

  public openMonthSelector() {
    this.allMonth = this.crdp.getMonths(this.locale);
    this.menuMonthIsVisible = !this.menuMonthIsVisible;
  }
  public selectMonth(order: number) {
    this.selectedMonth = order;
    this.menuMonthIsVisible = !this.menuMonthIsVisible;
    this.loadMonthData();
  }

  public nextMonth() {
    this.selectedMonth++;
    if (this.selectedMonth === 13) {
      this.selectedMonth = 1;
      this.selectedYear++;
    }
    this.loadMonthData();
  }

  public previewMonth() {
    this.selectedMonth--;
    if (this.selectedMonth === 0) {
      this.selectedMonth = 12;
      this.selectedYear--;
    }
    this.loadMonthData();
  }

  acceptNewDate() {
    if (this.rangeMode) {
      if (this.selectStartDate !== undefined && this.selectLastDate !== undefined)
        this.selectLastDateEvent.emit([
          moment(this.selectStartDate.fulDate).format(this.formatOutputDate),
          moment(this.selectLastDate.fulDate).format(this.formatOutputDate)
        ]);
    } else {
      if (this.selectStartDate !== undefined)
        this.selectLastDateEvent.emit([moment(this.selectStartDate.fulDate).format(this.formatOutputDate)]);
    }
    this.menuIsVisiblr = !this.menuIsVisiblr;
  }

  clearCalendar() {
    this.ngOnInit();
    this.selectLastDateEvent.emit(['reset', 'reset']);
  }

  selectDay(day: CalendarDayPicker, setStr: boolean) {
    if (this.rangeMode)
      this.selectRangeDay(day, setStr);
    else
      this.selectSingleDay(day, setStr);
  }

  private selectStartDayInRange(day: CalendarDayPicker, fromCalendar: boolean) {
    this.cleareStartDay();
    this.cleareRange();
    day.isSelected = true;
    this.selectStartDate = JSON.parse(JSON.stringify(day));
    if (this.selectStartDate) {
      if (this.useTime) {
        this.selectedMin = 0;
        this.selectedHour = 0;
        this.selectStartDate.fulDate = moment(day.fulDate).minute(0).hour(0);
      }
      else
        this.selectStartDate.fulDate = moment(day.fulDate);

      if (fromCalendar)
        this.selectStartDateStr = this.selectStartDate.fulDate.format(this.baseFormat);

      this.selectRowIncludeInRange();

    }
  }

  private selectLastDayInRange(day: CalendarDayPicker, fromCalendar: boolean) {
    this.cleareEndDay();
    this.cleareRange();
    day.isSelected = true;
    this.selectLastDate = JSON.parse(JSON.stringify(day));
    if (this.selectLastDate) {
      if (this.useTime) {
        this.selectedMin = 59;
        this.selectedHour = 23;
        this.selectLastDate.fulDate = moment(day.fulDate).minute(59).hour(23);
      }
      else
        this.selectLastDate.fulDate = moment(day.fulDate);

      if (fromCalendar)
        this.selectLastDateStr = this.selectLastDate.fulDate.format(this.baseFormat);

      this.selectRowIncludeInRange();

    }
  }



  private selectRangeDay(day: CalendarDayPicker, fromCalendar: boolean) {
    if (day.isDayThisMonth && !day.isOutOfMaxMin) {
      if (this.selectStartDate !== undefined && this.selectLastDate !== undefined) {
        this.cleareEndDayStr();
        this.clearCalendarSelected();
        this.selectStartDayInRange(day, fromCalendar);
      }
      else
        if (this.selectStartDate === undefined)
          this.selectStartDayInRange(day, fromCalendar);
        else
          this.selectLastDayInRange(day, fromCalendar);
    }
  }

  private selectSingleDay(day: CalendarDayPicker, fromCalendar: boolean) {
    if (day.isDayThisMonth && !day.isOutOfMaxMin) {
      if (this.selectStartDate !== undefined) {
        this.cleareStartDay();
        this.selectSingleDay(day, fromCalendar);
      } else {
        day.isSelected = true;
        this.selectStartDate = JSON.parse(JSON.stringify(day));
        if (this.selectStartDate) {
          if (this.useTime) {
            this.selectedMin = 0;
            this.selectedHour = 0;
            this.selectStartDate.fulDate = moment(day.fulDate).minute(0).hour(0);
          } else {
            this.selectStartDate.fulDate = moment(day.fulDate);
          }
          if (fromCalendar)
            this.selectStartDateStr = this.selectStartDate.fulDate.format(this.baseFormat);
        }
      }
    }
  }

  private selectRowIncludeInTempoRange(day: CalendarDayPicker) {
    if (this.selectStartDate)
      this.calendar = this.crdp.selectAllRowIncludeInRange(this.calendar, this.selectStartDate, day);
  }

  private selectRowIncludeInRange() {
    if (this.selectStartDate && this.selectLastDate) {

      if (this.selectLastDate.fulDate?.isBefore(this.selectStartDate.fulDate)) {
        this.serErrorByType(TypeError.StartAfterEnd)
        this.isError = true;
        this.cleareRange();
        return;
      }

      if (this.selectStartDate.isOutOfMaxMin || this.selectLastDate.isOutOfMaxMin) {
        this.serErrorByType(TypeError.OutOfMaxMin);
        this.isError = true;
        this.cleareRange();
        return;
      }

      if (this.maxChoseDay) {
        const duration = moment.duration(this.selectLastDate.fulDate?.diff(this.selectStartDate.fulDate));
        if (duration.days() > this.maxChoseDay - 1) {
          this.serErrorByType(TypeError.MaxChooseDay)
          this.isError = true;
          this.cleareRange();
          return;
        }
      }

      this.serErrorByType(TypeError.None)
      this.isError = false;
      this.calendar = this.crdp.selectAllRowIncludeInRange(this.calendar, this.selectStartDate, this.selectLastDate);
    }
  }

  public selectTest(day: CalendarDayPicker, fromCalendar: boolean) {
    if (this.selectStartDate && !this.selectLastDate)
      if (this.selectStartDate.numberDay != day.numberDay)
        if (day.isDayThisMonth && !day.isOutOfMaxMin) {
          this.cleareRange();
          this.selectRowIncludeInTempoRange(day);
        }
  }

  private serErrorByType(type: TypeError) {
    switch (type) {
      case TypeError.None: {
        this.error = '';
        break;
      }
      case TypeError.OutOfMaxMin: {
        if (this.locale.includes('ru'))
          this.error = 'выход за макс/мин';
        else
          this.error = 'out of max/min';
        break;
      }
      case TypeError.MaxChooseDay: {
        if (this.locale.includes('ru'))
          this.error = 'вне диапазона';
        else
          this.error = 'out of range';
        break;
      }
      case TypeError.StartAfterEnd: {
        if (this.locale.includes('ru'))
          this.error = 'старт > конец';
        else
          this.error = 'start > end';
        break;
      }
    }
  }

  private cleareStartDayStr() {
    this.selectStartDateStr = undefined;
  }
  private cleareStartDay() {
    if (this.selectStartDate) {
      const numberDay = this.selectStartDate.fulDate?.format('D');
      for (let row of this.calendar) {
        for (let cell of row.week) {
          if (cell.numberDay == +(numberDay as string) && cell.isDayThisMonth)
            cell.isSelected = false;
        }
      }
    }
    this.selectStartDate = undefined;
  }

  private cleareEndDayStr() {
    this.selectLastDateStr = undefined;
  }
  private cleareEndDay() {
    if (this.selectLastDate) {
      const numberDay = this.selectLastDate.fulDate?.format('D');
      for (let row of this.calendar) {
        for (let cell of row.week) {
          if (cell.numberDay == +(numberDay as string) && cell.isDayThisMonth)
            cell.isSelected = false;
        }
      }
    }

    this.selectLastDate = undefined;
  }

  private cleareRange() {
    for (const cal of this.calendar)
      for (const day of cal.week)
        day.isIncludeRage = false;
  }

  private clearCalendarSelected() {
    this.cleareStartDay();
    this.cleareEndDay();
    this.cleareRange();
  }


}
