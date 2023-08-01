import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { CompackDatePickerService } from '../compack-date-picker.service';
import { CompackDateFormatService } from '../compack-date-format.service';
import { CalendarPicker } from '../model/calendar';
import { CalendarDayPicker } from '../model/calendar-day';
import { CompackRelativeDateModel } from '../model/compack-relative-date-model';
import { MonthSelect } from '../model/month-select';

@Component({
  selector: 'compack-date-picker-range',
  templateUrl: './compack-date-picker-range.component.html',
  styleUrls: ['./compack-date-picker-range.component.scss'],
  animations: [
    trigger('menuMonthState', [
      state('hidden', style({ zIndex: -1, opacity: 0 })),
      state('visible', style({ zIndex: 1, opacity: 1, })),
      transition('hidden => visible', animate('0.1s')),
      transition('visible => hidden', animate('0.1s')),
    ]),
    trigger('calendarStartUpdate', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden <=> visible', animate('0.1s')),
    ]),
    trigger('calendarEndUpdate', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden <=> visible', animate('0.1s')),
    ])
  ]
})
export class CompackDatePickerRangeComponent implements OnInit, OnDestroy {

  public calendarStartUpdateState = 'visible';
  public calendarEndUpdateState = 'visible';
  public whencalendarStartAnimate(event: any) {
    if (event.toState == 'hidden') {
      this.loadMonthStartData();
      this.calendarStartUpdateState = 'visible';
    }
  }
  public whencalendarEndAnimate(event: any) {
    if (event.toState == 'hidden') {
      this.loadMonthEndData();
      this.calendarEndUpdateState = 'visible';
    }
  }

  // events
  @Output() selectLastDateEvent = new EventEmitter<string[]>();
  // input config
  @Input() locale = 'en';
  @Input() disabled = false;
  @Input() formatOutputDate = `dd.mm.yyyy`;
  @Input() relativeDateModel: CompackRelativeDateModel[] | undefined = undefined;

  private formatViewDate = `dd.mm.yyyy`;

  // settings dialog
  public isDialog = false;
  public isOpen = false;
  public handlerRef: ElementRef | undefined = undefined;
  private onDocClickEv: (() => void) | undefined;
  public left: string | undefined;
  public top: string | undefined;
  // view
  public acceptBtn = 'View';
  public cancelBtn = 'Reset';
  // data month
  public allMonth: MonthSelect[] = [];
  public menuStartMonthIsVisible = false;
  @ViewChild('monthStartSelector') monthStartSelector: ElementRef | undefined;
  @ViewChild('monthStartTitle') monthStartTitle: ElementRef | undefined;
  public menuEndMonthIsVisible = false;
  @ViewChild('monthEndSelector') monthEndSelector: ElementRef | undefined;
  @ViewChild('monthEndTitle') monthEndTitle: ElementRef | undefined;
  // data start
  public nameMonthStart = '';
  private selectedMonthStart = new Date().getMonth();
  public selectedYearStart = new Date().getFullYear();
  public calendarStart: CalendarPicker[] = [];
  public calendarStartWeekName: string[] = [];
  public selectStartDate: CalendarDayPicker | undefined;
  public selectStartDateStr: string | undefined;
  // data end
  public nameMonthEnd = '';
  private selectedMonthEnd = new Date().getMonth();
  public selectedYearEnd = new Date().getFullYear();
  public calendarEnd: CalendarPicker[] = [];
  public calendarEndWeekName: string[] = [];
  public selectEndDate: CalendarDayPicker | undefined;
  public selectEndDateStr: string | undefined;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private dfs: CompackDateFormatService,
    private crdp: CompackDatePickerService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['locale'] != undefined) {
      if (changes['locale'].currentValue == '') this.locale = 'en';
      this.ngOnInit();
    }
  }

  ngOnInit() {

    if (this.isDialog) {
      if (this.onDocClickEv) this.onDocClickEv();
      this.onDocClickEv = this.renderer.listen('document', 'click', (event) => {
        if ((this.handlerRef && !this.handlerRef.nativeElement.contains(event.target) && !this.el.nativeElement.contains(event.target)))
          this.isOpen = false;
        if (this.monthStartSelector && !this.monthStartSelector.nativeElement.contains(event.target) && this.monthStartTitle && !this.monthStartTitle.nativeElement.contains(event.target))
          this.menuStartMonthIsVisible = false;
        if (this.monthEndSelector && !this.monthEndSelector.nativeElement.contains(event.target) && this.monthEndTitle && !this.monthEndTitle.nativeElement.contains(event.target))
          this.menuEndMonthIsVisible = false;
      });
    }

    try { new Date().toLocaleString(this.locale, { month: 'long' }); }
    catch (error) {
      this.locale = 'en';
      console.error(`invalide locale '${this.locale}' - used 'en'`);
    }

    if (!this.relativeDateModel)
      this.relativeDateModel = this.crdp.getDefaoultRelativeDates(this.locale);

    this.acceptBtn = this.locale.toLowerCase().includes('ru') ? 'Принять' : 'View';
    this.cancelBtn = this.locale.toLowerCase().includes('ru') ? 'Сбросить' : 'Reset';

    this.cleareStartDay();
    this.cleareEndDay();
    this.crdp.cleareRnge(this.calendarEnd);
    this.crdp.cleareRnge(this.calendarStart);

    // this.calendarStartUpdateState = 'hidden';
    // this.calendarEndUpdateState = 'hidden';
    this.loadMonthStartData();
    this.loadMonthEndData();
  }

  ngOnDestroy() {
    if (this.onDocClickEv) this.onDocClickEv();
  }

  public openStartMonthSelector() {
    if (this.disabled) return;
    this.allMonth = this.crdp.getMonths(this.locale);
    this.menuStartMonthIsVisible = !this.menuStartMonthIsVisible;
  }
  public selectStartMonth(order: number) {
    this.selectedMonthStart = order;
    this.menuStartMonthIsVisible = !this.menuStartMonthIsVisible;
    this.calendarStartUpdateState = 'hidden';
  }

  public openEndMonthSelector() {
    if (this.disabled) return;
    this.allMonth = this.crdp.getMonths(this.locale);
    this.menuEndMonthIsVisible = !this.menuEndMonthIsVisible;
  }
  public selectEndMonth(order: number) {
    this.selectedMonthEnd = order;
    this.menuEndMonthIsVisible = !this.menuEndMonthIsVisible;
    this.calendarEndUpdateState = 'hidden';
  }

  private loadMonthStartData() {
    this.nameMonthStart = this.crdp.getNameMonth(this.selectedMonthStart, this.locale);
    this.calendarStart = this.crdp.getWeeksForCalendar(this.selectedMonthStart, this.selectedYearStart, this.locale, this.selectStartDate, this.selectEndDate, this.selectEndDate?.fulDate, undefined);
    this.calendarStartWeekName = this.crdp.getNameDayOfWeek(this.calendarStart[0].week, this.locale);
  }

  private loadMonthEndData() {
    this.nameMonthEnd = this.crdp.getNameMonth(this.selectedMonthEnd, this.locale);
    this.calendarEnd = this.crdp.getWeeksForCalendar(this.selectedMonthEnd, this.selectedYearEnd, this.locale, this.selectStartDate, this.selectEndDate, undefined, this.selectStartDate?.fulDate);
    this.calendarEndWeekName = this.crdp.getNameDayOfWeek(this.calendarEnd[0].week, this.locale);
  }

  public onViewPrevMonthStartClick() {
    this.selectedMonthStart--;
    if (this.selectedMonthStart === -1) {
      this.selectedMonthStart = 11;
      this.selectedYearStart--;
    }
    this.calendarStartUpdateState = 'hidden';
  }
  public onViewNextMonthStartClick() {
    this.selectedMonthStart++;
    if (this.selectedMonthStart === 12) {
      this.selectedMonthStart = 0;
      this.selectedYearStart++;
    }
    this.calendarStartUpdateState = 'hidden';
  }

  public onViewPrevMonthEndClick() {
    this.selectedMonthEnd--;
    if (this.selectedMonthEnd === -1) {
      this.selectedMonthEnd = 11;
      this.selectedYearEnd--;
    }
    this.calendarEndUpdateState = 'hidden';
  }
  public onViewNextMonthEndClick() {
    this.selectedMonthEnd++;
    if (this.selectedMonthEnd === 12) {
      this.selectedMonthEnd = 0;
      this.selectedYearEnd++;
    }
    this.calendarEndUpdateState = 'hidden';
  }

  public selectStartDay(day: CalendarDayPicker) {
    if (this.disabled) return;
    if (!day.isDayThisMonth || day.isOutOfMaxMin) return;

    if (this.selectStartDate) this.cleareStartDay();

    day.isSelected = true;
    this.selectStartDate = JSON.parse(JSON.stringify(day));
    if (!this.selectStartDate) throw new Error('error on day select');
    this.selectStartDate.fulDate = new Date(day.fulDate);
    this.selectStartDateStr = this.dfs.dateFormat(this.selectStartDate.fulDate, this.formatViewDate);

    if (this.selectEndDate && this.selectStartDate.fulDate > this.selectEndDate.fulDate)
      this.cleareEndDay();

    this.crdp.updateCalendarState(this.calendarStart, this.selectStartDate, this.selectEndDate, this.selectEndDate?.fulDate, undefined);
    this.crdp.updateCalendarState(this.calendarEnd, this.selectStartDate, this.selectEndDate, undefined, this.selectStartDate.fulDate);


  }
  public selectEndDay(day: CalendarDayPicker) {
    if (this.disabled) return;
    if (!day.isDayThisMonth || day.isOutOfMaxMin) return;

    if (this.selectEndDate) this.cleareEndDay();

    day.isSelected = true;
    this.selectEndDate = JSON.parse(JSON.stringify(day));
    if (!this.selectEndDate) throw new Error('error on day select');
    this.selectEndDate.fulDate = new Date(day.fulDate);
    this.selectEndDateStr = this.dfs.dateFormat(this.selectEndDate.fulDate, this.formatViewDate);

    if (this.selectStartDate && this.selectEndDate.fulDate < this.selectStartDate.fulDate)
      this.cleareStartDay();

    this.crdp.updateCalendarState(this.calendarStart, this.selectStartDate, this.selectEndDate, this.selectEndDate.fulDate, undefined);
    this.crdp.updateCalendarState(this.calendarEnd, this.selectStartDate, this.selectEndDate, undefined, this.selectStartDate?.fulDate);
  }

  public acceptNewDate() {
    if (this.selectStartDate !== undefined && this.selectEndDate !== undefined) {
      this.selectLastDateEvent.emit([
        this.dfs.dateFormat(this.selectStartDate.fulDate, this.formatOutputDate),
        this.dfs.dateFormat(this.selectEndDate.fulDate, this.formatOutputDate)
      ]);
    }
    if (this.isDialog)
      this.changeDialogState();
  }

  public cleareTempSelected() {
    this.crdp.cleareTempoRange(this.calendarEnd);
    this.crdp.cleareTempoRange(this.calendarStart);
  }
  public tempSelectEndPeriod(day: CalendarDayPicker) {
    if (this.selectStartDate && this.selectStartDate.numberDay != day.numberDay && day.isDayThisMonth && !day.isOutOfMaxMin && !this.disabled)
      this.crdp.selectAllRowIncludeInTempoRange(this.calendarEnd, this.selectStartDate, day);
  }
  public tempSelectStartPeriod(day: CalendarDayPicker) {
    if (this.selectEndDate && this.selectEndDate.numberDay != day.numberDay && day.isDayThisMonth && !day.isOutOfMaxMin && !this.disabled)
      this.crdp.selectAllRowIncludeInTempoRange(this.calendarStart, day, this.selectEndDate);
  }

  private cleareStartDay() {
    if (this.selectStartDate) {
      const numberDay = this.selectStartDate.fulDate.getDate();
      for (const row of this.calendarStart) {
        for (const cell of row.week) {
          if (cell.numberDay == numberDay && cell.isDayThisMonth)
            cell.isSelected = false;
        }
      }
    }
    this.selectStartDate = undefined;
    this.selectStartDateStr = undefined;
  }
  private cleareEndDay() {
    if (this.selectEndDate) {
      const numberDay = this.selectEndDate.fulDate.getDate();
      for (const row of this.calendarEnd) {
        for (const cell of row.week) {
          if (cell.numberDay == numberDay && cell.isDayThisMonth)
            cell.isSelected = false;
        }
      }
    }
    this.selectEndDate = undefined;
    this.selectEndDateStr = undefined;
  }

  public clearCalendar() {
    this.ngOnInit();
    this.selectLastDateEvent.emit(['reset', 'reset']);
    if (this.isDialog)
      this.changeDialogState();
  }

  public onRelativeDateClick(relativeDate: CompackRelativeDateModel) {
    if (!this.disabled) {

      this.cleareStartDay();
      this.cleareEndDay();
      this.crdp.cleareRnge(this.calendarEnd);
      this.crdp.cleareRnge(this.calendarStart);

      const startDate = relativeDate.dateStartFunc();
      this.selectedMonthStart = startDate.getMonth();
      this.selectedYearStart = startDate.getFullYear();
      // this.calendarStartUpdateState = 'hidden';
      // setTimeout(() => {
      //   const dayStart = this.crdp.getDayByDate(startDate, this.calendarStart);
      //   if (dayStart) this.selectStartDay(dayStart);
      // }, 200);
      this.loadMonthStartData();
      const dayStart = this.crdp.getDayByDate(startDate, this.calendarStart);
      if (dayStart) this.selectStartDay(dayStart);

      const endDate = relativeDate.dateEndFunc();
      this.selectedMonthEnd = endDate.getMonth();
      this.selectedYearEnd = endDate.getFullYear();
      // this.calendarEndUpdateState = 'hidden';
      // setTimeout(() => {
      //   const dayEnd = this.crdp.getDayByDate(endDate, this.calendarEnd);
      //   if (dayEnd) this.selectEndDay(dayEnd);
      // }, 200);
      this.loadMonthEndData();
      const dayEnd = this.crdp.getDayByDate(endDate, this.calendarEnd);
      if (dayEnd) this.selectEndDay(dayEnd);

      this.acceptNewDate();
    }
  }

  public changeDialogState() {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) return;
    if (!this.handlerRef) return;
    const native = this.handlerRef.nativeElement;
    const rec: DOMRect = native.getBoundingClientRect();

    const dialogHeight = 340;
    const dialogWidth = 700;

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

}
