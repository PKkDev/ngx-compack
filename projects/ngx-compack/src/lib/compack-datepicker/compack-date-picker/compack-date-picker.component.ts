import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, SimpleChange, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { CalendarPicker } from '../model/calendar';
import { CalendarDayPicker } from '../model/calendar-day';
import { MonthSelect } from '../model/month-select';
import { CalendareError } from '../model/type-picker-error';
import { CompackDatePickerService } from './compack-date-picker.service';

@Component({
  selector: 'compack-date-picker',
  templateUrl: './compack-date-picker.component.html',
  styleUrls: ['./compack-date-picker.component.scss']
})
export class CompackDatePickerComponent implements OnInit, AfterViewInit {
  // inner configs
  public error = new CalendareError();
  private baseDateInputFormat = 'DD.MM.YYYY';
  private baseTimeInputFormat = 'HH:mm';
  // events
  @Output() selectLastDateEvent = new EventEmitter<string[]>();
  // input config
  @Input() rangeMode = false;
  @Input() type = 'block'; /* block line icon */
  @Input() viewFieldSelectedDate = false;
  @Input() formatOutputDate: string | undefined;
  @Input() useTime = false;
  @Input() autoSelect = false;
  public canAutoSelect = false;
  @Input() maxChoseDay: number | undefined;
  @Input() max: Moment | undefined;
  @Input() min: Moment | undefined;
  @Input() locale = 'en';
  // @Input() initialSelectedDate: string[] | undefined;
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
  // data
  public allMonth: MonthSelect[] = [];
  calendar: CalendarPicker[] = [];
  calendarWeekName: string[] = [];
  // select;
  selectStartDate: CalendarDayPicker | undefined;
  selectStartDateStr: string | undefined;
  selectStartTimeStr: string | undefined;

  selectLastDate: CalendarDayPicker | undefined;
  selectLastDateStr: string | undefined;
  selectLastTimeStr: string | undefined;

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private crdp: CompackDatePickerService) { }

  ngAfterViewInit() {
    this.loadCalendarTemplate(this.type);
    // console.log(this.initialSelectedDate);
    // if(this.initialSelectedDate){
    //   console.log('start set initial');
    //   if(this.initialSelectedDate.length ==2){
    //     if(this.rangeMode){

    //     }else{
    //       this.selectSingleDay(this.initialSelectedDate[0]);
    //     }
    //   }
    // }
  }

  ngOnInit() {
    this.checkCanAutoSelect();
    this.clearCalendarSelected();
    this.calendarWeekName = this.crdp.getNameDayOfWeek(this.locale);
    this.setViewFormat();
    this.loadMonthData();
    this.setFields();
    this.error = new CalendareError();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.autoSelect != undefined) {
      this.checkCanAutoSelect();
    }
    if (changes.type != undefined) {
      this.loadCalendarTemplate(this.type);
    }
    if (changes.locale != undefined) {
      this.ngOnInit();
    }
    if (changes.min != undefined) {
      this.loadMonthData();
    }
    if (changes.max != undefined) {
      this.loadMonthData();
    }
    if (changes.rangeMode != undefined) {
      this.setFields();
      this.cleareEndDayStr();
      this.cleareStartDayStr();
      this.clearCalendarSelected();
      // this.loadMonthData();
    }
    if (changes.formatOutputDate != undefined) {
      this.setViewFormat();
    }
    if (changes.useTime != undefined) {
      this.cleareEndDayStr();
      this.cleareStartDayStr();
      this.clearCalendarSelected();
      this.checkCanAutoSelect();
    }
  }

  private checkCanAutoSelect() {
    this.canAutoSelect = this.autoSelect ? !this.useTime : false
    //console.log(this.canAutoSelect);
  }

  public onChangeSelectedStartTime() {
    if (this.selectStartTimeStr) {
      const mDate = moment(this.selectStartTimeStr, this.baseTimeInputFormat);
      const hour = mDate.hour();
      const min = mDate.minute();
      if (hour != NaN && min != NaN) {
        // console.log(this.selectStartDate);
        this.selectStartDate?.fulDate?.hour(hour).minute(min);
      }
    }
  }

  public onChangeSelectedStartDate() {
    if (this.selectStartDateStr) {

      console.log('this.selectStartDateStr', this.selectStartDateStr);

      const mDate = moment(this.selectStartDateStr, this.baseDateInputFormat);
      const year = mDate.year();
      const month = mDate.month();

      if (year && month) {
        this.selectedMonth = month + 1;
        this.selectedYear = year;
        this.loadMonthData();
        const day = this.crdp.getDayByDate(mDate, this.calendar);
        console.log(day);

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

  public onChangeSelectedLastTime() {
    if (this.selectLastTimeStr) {
      const mDate = moment(this.selectLastTimeStr, this.baseTimeInputFormat);
      const hour = mDate.hour();
      const min = mDate.minute();
      if (hour != NaN && min != NaN) {
        // console.log(this.selectStartDate);
        this.selectLastDate?.fulDate?.hour(hour).minute(min);
      }
    }
  }

  public onChangeSelectedLastDate() {
    if (this.selectLastDateStr) {

      const mDate = moment(this.selectLastDateStr, this.baseDateInputFormat);
      const year = mDate.year();
      const month = mDate.month();

      if (year && month) {
        this.selectedMonth = month + 1;
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

  private setFields() {
    if (this.locale.toLowerCase().includes('ru')) {
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
      if (this.selectStartDate !== undefined && this.selectLastDate !== undefined) {
        this.error = this.crdp.checkInputError(this.selectStartDate, this.selectLastDate, this.locale, this.maxChoseDay);
        if (this.error.isError) {
          this.cleareRange();
          return;
        }
        this.selectLastDateEvent.emit([
          moment(this.selectStartDate.fulDate).format(this.formatOutputDate),
          moment(this.selectLastDate.fulDate).format(this.formatOutputDate)
        ]);
      }
    } else {
      if (this.selectStartDate !== undefined) {
        this.selectLastDateEvent.emit([moment(this.selectStartDate.fulDate).format(this.formatOutputDate)]);
      }
    }
    this.menuIsVisiblr = !this.menuIsVisiblr;
  }

  clearCalendar() {
    this.error = new CalendareError();
    this.cleareEndDayStr();
    this.cleareStartDayStr();
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
      this.selectStartDate.fulDate = moment(day.fulDate);
      if (this.useTime) {
        if (!this.selectStartTimeStr) {
          this.selectStartTimeStr = '00:00';
          this.selectStartDate.fulDate.hour(0).minute(0);
        }
        else {
          const hm = moment(this.selectStartTimeStr, this.baseTimeInputFormat);
          this.selectStartDate.fulDate.hour(hm.hour()).minute(hm.minute());
        }
      }
      if (fromCalendar)
        this.selectStartDateStr = this.selectStartDate.fulDate.format(this.baseDateInputFormat);
      this.selectRowIncludeInRange();
    }
  }

  private selectLastDayInRange(day: CalendarDayPicker, fromCalendar: boolean) {
    this.cleareEndDay();
    this.cleareRange();
    day.isSelected = true;
    this.selectLastDate = JSON.parse(JSON.stringify(day));
    if (this.selectLastDate) {
      this.selectLastDate.fulDate = moment(day.fulDate);
      if (this.useTime) {
        if (!this.selectLastTimeStr) {
          this.selectLastTimeStr = '23:59';
          this.selectLastDate.fulDate.hour(23).minute(59);
        }
        else {
          const hm = moment(this.selectLastTimeStr, this.baseTimeInputFormat);
          this.selectLastDate.fulDate.hour(hm.hour()).minute(hm.minute());
        }
      }
      if (fromCalendar)
        this.selectLastDateStr = this.selectLastDate.fulDate.format(this.baseDateInputFormat);
      this.selectRowIncludeInRange();
    }
    if (this.canAutoSelect)
      this.acceptNewDate();
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
          this.selectStartDate.fulDate = moment(day.fulDate);
          if (this.useTime) {
            if (!this.selectStartTimeStr) {
              this.selectStartTimeStr = '00:00';
              this.selectStartDate.fulDate.hour(0).minute(0);
            }
            else {
              const hm = moment(this.selectStartTimeStr, this.baseTimeInputFormat);
              this.selectStartDate.fulDate.hour(hm.hour()).minute(hm.minute());
            }
          }
          if (fromCalendar) {
            this.selectStartDateStr = this.selectStartDate.fulDate.format(this.baseDateInputFormat);
          }
        }
        if (this.canAutoSelect)
          this.acceptNewDate();
      }
    }
  }

  private selectRowIncludeInRange() {
    if (this.selectStartDate && this.selectLastDate) {
      this.error = this.crdp.checkInputError(this.selectStartDate, this.selectLastDate, this.locale, this.maxChoseDay);
      if (this.error.isError) {
        this.cleareRange();
        return;
      }
      this.calendar = this.crdp.selectAllRowIncludeInRange(this.calendar, this.selectStartDate, this.selectLastDate, false);
    }
  }

  public cleareTempSelected() {
    for (const cal of this.calendar)
      for (const day of cal.week)
        day.isIncludeTempoRage = false;
  }

  public TempSelectEndPeriod(day: CalendarDayPicker) {
    if (this.rangeMode)
      if (this.selectStartDate && !this.selectLastDate)
        if (this.selectStartDate.numberDay != day.numberDay)
          if (day.isDayThisMonth && !day.isOutOfMaxMin) {
            this.cleareRange();
            this.calendar = this.crdp.selectAllRowIncludeInRange(this.calendar, this.selectStartDate, day, true);
          }
  }

  private cleareStartDayStr() {
    this.selectStartTimeStr = undefined;
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
    this.selectLastTimeStr = undefined;
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
