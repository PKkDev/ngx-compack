import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompackDatePickerService } from '../compack-date-picker.service';
import { CompackDateFormatService } from '../compack-date-format.service';
import { CalendarPicker } from '../model/calendar';
import { CalendarDayPicker } from '../model/calendar-day';
import { MonthSelect } from '../model/month-select';
import { CalendareError } from '../model/type-picker-error';

@Component({
  selector: 'compack-date-picker',
  templateUrl: './compack-date-picker.component.html',
  styleUrls: ['./compack-date-picker.component.scss'],
  animations: [
    trigger('menuMonthState', [
      state('hidden', style({ zIndex: -1, opacity: 0 })),
      state('visible', style({ zIndex: 1, opacity: 1, })),
      transition('hidden => visible', animate('0.1s')),
      transition('visible => hidden', animate('0.1s')),
    ]),
    trigger('calendarUpdate', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden <=> visible', animate('0.1s')),
    ]),
  ]
})
export class CompackDatePickerComponent implements OnInit, OnDestroy {

  public calendarUpdateState = 'visible';

  // settings dialog
  public isDialog = false;
  public isOpen = false;
  public handlerRef: ElementRef | undefined = undefined;
  private onDocClickEv: (() => void) | undefined;
  public left: string | undefined;
  public top: string | undefined;

  // inner configs
  public error = new CalendareError();
  // events
  @Output() selectLastDateEvent = new EventEmitter<string[]>();
  // input config
  @Input() locale = 'en';
  @Input() disabled = false;
  @Input() rangeMode = false;
  @Input() viewFieldSelectedDate = false;
  @Input() useTime = false;
  @Input() autoSelect = false;
  @Input() maxChoseDay: number | undefined;
  @Input() max: Date | undefined;
  @Input() min: Date | undefined;
  @Input() formatOutputDate = `dd.mm.yyyy'T'HH:MM`;
  @Input() setDateEvent: EventEmitter<Date[]> | undefined;

  private formatViewDate = `dd.mm.yyyy`;

  public canAutoSelect = false;
  public viewErrorMessage = false;
  // @Input() initialSelectedDate: string[] | undefined;
  // view
  public fieldPlaceHolder = 'from/to';
  public acceptBtn = 'View';
  public cancelBtn = 'Reset';
  private selectedMonth = new Date().getMonth();
  public selectedYear = new Date().getFullYear();
  public nameMonth = '';
  public menuMonthIsVisible = false;
  @ViewChild('monthSelector') monthSelector: ElementRef | undefined;
  @ViewChild('monthTitle') monthTitle: ElementRef | undefined;
  // data
  public allMonth: MonthSelect[] = [];
  public calendar: CalendarPicker[] = [];
  public calendarWeekName: string[] = [];
  // select;
  public selectStartDate: CalendarDayPicker | undefined;
  public selectStartDateStr: string | undefined;
  public selectStartTimeStr: string | undefined;

  public selectLastDate: CalendarDayPicker | undefined;
  public selectLastDateStr: string | undefined;
  public selectLastTimeStr: string | undefined;

  // subs
  private setDateEventSubs: Subscription | undefined;

  constructor(
    private el: ElementRef,
    private dfs: CompackDateFormatService,
    private crdp: CompackDatePickerService,
    private renderer: Renderer2) { }

  ngOnInit() {

    if (this.setDateEvent) {
      if (this.setDateEventSubs) this.setDateEventSubs.unsubscribe();
      this.setDateEventSubs = this.setDateEvent.subscribe((next: Date[]) => {
        if (next.length != 2) { console.error('length initial date array != 2'); return; }
        for (const date of next)
          if (date.toString() === 'Invalid Date') { console.error('initial date invalide'); return; }
        if (this.rangeMode) {
          this.selectStartTimeStr = this.dfs.dateFormat(next[0], 'HH:MM');
          this.selectedMonth = next[0].getMonth();
          this.selectedYear = next[0].getFullYear();
          this.loadMonthData();
          const dayStart = this.crdp.getDayByDate(next[0], this.calendar);
          if (dayStart) this.selectDay(dayStart, true);

          this.selectLastTimeStr = this.dfs.dateFormat(next[1], 'HH:MM');
          this.selectedMonth = next[1].getMonth();
          this.selectedYear = next[1].getFullYear();
          this.loadMonthData();
          const dayEnd = this.crdp.getDayByDate(next[1], this.calendar);
          if (dayEnd) this.selectDay(dayEnd, true);
        } else {
          this.selectStartTimeStr = this.dfs.dateFormat(next[0], 'HH:MM');
          this.selectedMonth = next[0].getMonth();
          this.selectedYear = next[0].getFullYear();
          this.loadMonthData();
          const day = this.crdp.getDayByDate(next[0], this.calendar);
          if (day) this.selectDay(day, true);
        }
      });
    }

    if (this.isDialog) {
      if (this.onDocClickEv) this.onDocClickEv();
      this.onDocClickEv = this.renderer.listen('document', 'click', (event) => {
        if ((this.handlerRef && !this.handlerRef.nativeElement.contains(event.target) && !this.el.nativeElement.contains(event.target)))
          this.isOpen = false;
        if (this.monthSelector && !this.monthSelector.nativeElement.contains(event.target) && this.monthTitle && !this.monthTitle.nativeElement.contains(event.target))
          this.menuMonthIsVisible = false;
      });
    }

    try { new Date().toLocaleString(this.locale, { month: 'long' }); }
    catch (error) {
      this.locale = 'en';
      console.error(`invalide locale '${this.locale}' - used 'en'`);
    }

    this.canAutoSelect = this.autoSelect ? !this.useTime : false

    this.cleareStartDay();
    this.cleareEndDay();
    this.crdp.cleareRnge(this.calendar);

    // this.calendarUpdateState = 'hidden';
    this.loadMonthData();

    this.setViewFormat();
    this.setFields();
    this.error = new CalendareError();
  }

  ngOnDestroy() {
    if (this.onDocClickEv) this.onDocClickEv();
    if (this.setDateEventSubs) this.setDateEventSubs.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['locale']) {
      if (changes['locale'].currentValue == '') this.locale = 'en';
      this.ngOnInit();
    }
    if (changes['rangeMode']) this.ngOnInit();
    if (changes['useTime']) this.ngOnInit();
    if (changes['autoSelect']) this.canAutoSelect = this.autoSelect ? !this.useTime : false;
    if (changes['max']) this.loadMonthData();
    if (changes['min']) this.loadMonthData();
    if (changes['formatOutputDate']) this.setViewFormat();
    if (changes['setDate']) {
      // if (this.setDateEvent) {
      //   if (this.setDateEventSubs) this.setDateEventSubs.unsubscribe();
      //   this.setDateEventSubs = this.setDateEvent.subscribe((next: Date[]) => { console.error(next); });
      // }
    }
  }

  public onChangeSelectedStartTime() {
    if (!this.selectStartTimeStr || !this.selectStartDate) return;
    this.selectStartDate.fulDate.setHours(this.crdp.getHourFromTimeStr(this.selectStartTimeStr));
    this.selectStartDate.fulDate.setMinutes(this.crdp.getMinFromTimeStr(this.selectStartTimeStr));
  }
  public onChangeSelectedStartDate() {
    if (!this.selectStartDateStr) return;

    const date = this.crdp.getDateFromInputDateStr(this.selectStartDateStr);
    if (!date) return;

    this.selectedMonth = date.getMonth();
    this.selectedYear = date.getFullYear();
    this.loadMonthData();

    const day = this.crdp.getDayByDate(date, this.calendar);
    if (day) this.selectDay(day, false);
  }

  public onChangeSelectedLastTime() {
    if (!this.selectLastTimeStr || !this.selectLastDate) return;
    this.selectLastDate.fulDate.setHours(this.crdp.getHourFromTimeStr(this.selectLastTimeStr));
    this.selectLastDate.fulDate.setMinutes(this.crdp.getMinFromTimeStr(this.selectLastTimeStr));
  }
  public onChangeSelectedLastDate() {
    if (!this.selectLastDateStr) return;

    const date = this.crdp.getDateFromInputDateStr(this.selectLastDateStr);
    if (!date) return;

    this.selectedMonth = date.getMonth();
    this.selectedYear = date.getFullYear();
    this.loadMonthData();

    const day = this.crdp.getDayByDate(date, this.calendar);
    if (day) this.selectDay(day, false);
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
    if (!this.formatOutputDate) this.formatOutputDate = this.useTime ? `dd.mm.yyyy'T'HH:MM` : `dd.mm.yyyy`;
  }

  private loadMonthData() {
    this.nameMonth = this.crdp.getNameMonth(this.selectedMonth, this.locale);
    this.calendar = this.crdp.getWeeksForCalendar(this.selectedMonth, this.selectedYear, this.locale, this.selectStartDate, this.selectLastDate, this.max, this.min);
    this.calendarWeekName = this.crdp.getNameDayOfWeek(this.calendar[0].week, this.locale);
  }

  public changeDialogState() {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) return;
    if (!this.handlerRef) return;
    const native = this.handlerRef.nativeElement;
    const rec: DOMRect = native.getBoundingClientRect();

    const dialogHeight = 370;
    const dialogWidth = 300;

    // не влез снизу
    if (rec.top + dialogHeight > window.innerHeight) {
      const offset = Math.abs(rec.top + dialogHeight - window.innerHeight) + 25;
      this.top = `${rec.top - offset - 5}px`;
    } else {
      this.top = `${rec.top + rec.height + 5}px`;
    }

    // не влез справа
    if (rec.left + dialogWidth > window.innerWidth) {
      const offset = Math.abs(rec.left + dialogWidth - window.innerWidth) + 25;
      this.left = `${rec.left - offset}px`;
    } else {
      this.left = `${rec.left}px`;
    }
  }

  public openMonthSelector() {
    if (this.disabled) return;
    this.allMonth = this.crdp.getMonths(this.locale);
    this.menuMonthIsVisible = !this.menuMonthIsVisible;
  }
  public selectMonth(order: number) {
    this.selectedMonth = order;
    this.menuMonthIsVisible = !this.menuMonthIsVisible;
    this.loadMonthData();
  }

  public onViewPrevMonthClick() {
    this.selectedMonth--;
    if (this.selectedMonth === -1) {
      this.selectedMonth = 11;
      this.selectedYear--;
    }
    this.calendarUpdateState = 'hidden';
  }
  public onViewNextMonthClick() {
    this.selectedMonth++;
    if (this.selectedMonth === 12) {
      this.selectedMonth = 0;
      this.selectedYear++;
    }
    this.calendarUpdateState = 'hidden';
  }

  public whencalendarAnimate(event: any) {
    if (event.toState == 'hidden') {
      this.loadMonthData();
      this.calendarUpdateState = 'visible';
    }
    // if (event.toState == 'visible') { console.log('done hidden->visible', event); }
  }

  acceptNewDate() {
    if (this.rangeMode) {
      if (this.selectStartDate && this.selectLastDate) {
        this.error = this.crdp.checkInputError(this.selectStartDate, this.selectLastDate, this.locale, this.maxChoseDay);
        if (this.error.isError) {
          this.crdp.cleareRnge(this.calendar);
          return;
        }
        this.selectLastDateEvent.emit([
          this.dfs.dateFormat(this.selectStartDate.fulDate, this.formatOutputDate),
          this.dfs.dateFormat(this.selectLastDate.fulDate, this.formatOutputDate)
        ]);
      }
    } else
      if (this.selectStartDate)
        this.selectLastDateEvent.emit([this.dfs.dateFormat(this.selectStartDate.fulDate, this.formatOutputDate)]);
    if (this.isDialog)
      this.changeDialogState();
  }

  clearCalendar() {
    this.ngOnInit();
    this.selectLastDateEvent.emit(['reset', 'reset']);
    if (this.isDialog)
      this.changeDialogState();

    this.selectStartTimeStr = undefined;
    this.selectStartDateStr = undefined;

    this.selectLastTimeStr = undefined;
    this.selectLastDateStr = undefined;
  }

  selectDay(day: CalendarDayPicker, setStr: boolean) {
    if (this.disabled) return;
    if (this.rangeMode) this.selectRangeDay(day, setStr);
    else this.selectSingleDay(day, setStr);
  }

  private selectRangeDay(day: CalendarDayPicker, fromCalendar: boolean) {
    if (!day.isDayThisMonth || day.isOutOfMaxMin) return;
    if (this.selectStartDate !== undefined && this.selectLastDate !== undefined) {
      this.cleareEndDay();
      this.selectStartDayInRange(day, fromCalendar);
    }
    else
      if (!this.selectStartDate) this.selectStartDayInRange(day, fromCalendar);
      else this.selectLastDayInRange(day, fromCalendar);
  }
  private selectStartDayInRange(day: CalendarDayPicker, fromCalendar: boolean) {
    this.cleareStartDay();
    this.crdp.cleareRnge(this.calendar);
    day.isSelected = true;
    this.selectStartDate = JSON.parse(JSON.stringify(day));
    if (!this.selectStartDate) throw new Error('error on day select');
    this.selectStartDate.fulDate = new Date(day.fulDate);
    if (this.useTime) {
      if (!this.selectStartTimeStr) {
        this.selectStartTimeStr = '00:00';
        this.selectStartDate.fulDate.setHours(0);
        this.selectStartDate.fulDate.setMinutes(0);
      }
      else {
        this.selectStartDate.fulDate.setHours(this.crdp.getHourFromTimeStr(this.selectStartTimeStr));
        this.selectStartDate.fulDate.setMinutes(this.crdp.getMinFromTimeStr(this.selectStartTimeStr));
      }
    }
    if (fromCalendar)
      this.selectStartDateStr = this.dfs.dateFormat(this.selectStartDate.fulDate, this.formatViewDate);

    this.crdp.updateCalendarState(this.calendar, this.selectStartDate, this.selectLastDate, this.max, this.min);
  }
  private selectLastDayInRange(day: CalendarDayPicker, fromCalendar: boolean) {
    this.cleareEndDay();
    this.crdp.cleareRnge(this.calendar);
    day.isSelected = true;
    this.selectLastDate = JSON.parse(JSON.stringify(day));
    if (!this.selectLastDate) throw new Error('error on day select');
    this.selectLastDate.fulDate = new Date(day.fulDate);
    if (this.useTime) {
      if (!this.selectLastTimeStr) {
        this.selectLastTimeStr = '23:59';
        this.selectLastDate.fulDate.setHours(23);
        this.selectLastDate.fulDate.setMinutes(59);
      }
      else {
        this.selectLastDate.fulDate.setHours(this.crdp.getHourFromTimeStr(this.selectLastTimeStr));
        this.selectLastDate.fulDate.setMinutes(this.crdp.getMinFromTimeStr(this.selectLastTimeStr));
      }
    }
    if (fromCalendar)
      this.selectLastDateStr = this.dfs.dateFormat(this.selectLastDate.fulDate, this.formatViewDate);

    this.crdp.updateCalendarState(this.calendar, this.selectStartDate, this.selectLastDate, this.max, this.min);

    if (this.selectStartDate) {
      this.error = this.crdp.checkInputError(this.selectStartDate, this.selectLastDate, this.locale, this.maxChoseDay);
      if (this.error.isError) {
        this.crdp.cleareRnge(this.calendar);
        return;
      }
    }

    if (this.canAutoSelect)
      this.acceptNewDate();
  }

  private selectSingleDay(day: CalendarDayPicker, fromCalendar: boolean) {
    if (!day.isDayThisMonth || day.isOutOfMaxMin) return;
    if (this.selectStartDate) {
      this.cleareStartDay();
      this.selectSingleDay(day, fromCalendar);
    } else {
      day.isSelected = true;
      this.selectStartDate = JSON.parse(JSON.stringify(day));
      if (!this.selectStartDate) throw new Error('selected day error');
      this.selectStartDate.fulDate = new Date(day.fulDate);

      if (this.useTime) {
        if (!this.selectStartTimeStr) {
          this.selectStartTimeStr = '00:00';
          this.selectStartDate.fulDate.setHours(0);
          this.selectStartDate.fulDate.setMinutes(0);
        } else {
          this.selectStartDate.fulDate.setHours(this.crdp.getHourFromTimeStr(this.selectStartTimeStr));
          this.selectStartDate.fulDate.setMinutes(this.crdp.getMinFromTimeStr(this.selectStartTimeStr))
        }
      }
      if (fromCalendar)
        this.selectStartDateStr = this.dfs.dateFormat(this.selectStartDate.fulDate, this.formatViewDate);

      if (this.canAutoSelect)
        this.acceptNewDate();
    }
  }

  public cleareTempSelected() {
    this.crdp.cleareTempoRange(this.calendar);
  }
  public TempSelectEndPeriod(day: CalendarDayPicker) {
    if (this.rangeMode)
      if (this.selectStartDate && !this.selectLastDate && this.selectStartDate.numberDay != day.numberDay && day.isDayThisMonth && !day.isOutOfMaxMin && !this.disabled)
        this.crdp.selectAllRowIncludeInTempoRange(this.calendar, this.selectStartDate, day);
  }

  private cleareStartDay() {
    if (this.selectStartDate) {
      const numberDay = this.selectStartDate.fulDate.getDate();
      for (const row of this.calendar) {
        for (const cell of row.week) {
          if (cell.numberDay == numberDay && cell.isDayThisMonth)
            cell.isSelected = false;
        }
      }
    }
    this.selectStartDate = undefined;
  }
  private cleareEndDay() {
    if (this.selectLastDate) {
      const numberDay = this.selectLastDate.fulDate.getDate();
      for (const row of this.calendar) {
        for (const cell of row.week) {
          if (cell.numberDay == numberDay && cell.isDayThisMonth)
            cell.isSelected = false;
        }
      }
    }
    this.selectLastDate = undefined;
  }
}
