import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import * as moment_ from 'moment';
import { CalendarPicker } from '../model/calendar';
import { CalendarDayPicker } from '../model/calendar-day';
import { CompackDatePickerService } from './compack-date-picker.service';

const moment = moment_;

/* 
type:
block
line
icon
 */

@Component({
  selector: 'compack-date-picker',
  templateUrl: './compack-date-picker.component.html',
  styleUrls: ['./compack-date-picker.component.scss']
})
export class CompackDatePickerComponent implements OnInit, AfterViewInit {
  // events
  @Output() selectLastDateEvent = new EventEmitter<string[]>();
  // input config
  @Input() type = 'block'
  @Input() formatOutputDate: string | undefined;
  @Input() useTime = false;
  @Input() maxChoseDay: number | undefined;
  @Input() max: string | undefined;
  @Input() min: string | undefined;
  @Input() locale = 'en';
  // type template
  @ViewChild('lineTemplate', { static: false })
  lineTemplate!: TemplateRef<any>;
  @ViewChild('blockTemplate', { static: false })
  blockTemplate!: TemplateRef<any>;
  @ViewChild('iconTemplate', { static: false })
  iconTemplate!: TemplateRef<any>;
  @ViewChild('picker', { static: false })
  picker!: TemplateRef<any>;
  // view
  selectedMonth = moment().month() + 1;
  selectedYear = moment().year();
  nameMonth = '';
  public choseTemplate = this.blockTemplate;
  public menuIsVisiblr = false;
  public isNeedViewFieldDate = false;
  public formatViewDateInPicker = 'DD.MM.YYYY'
  // time
  public selectedHour = 0;
  public selectedMin = 0;

  // data
  calendar: CalendarPicker[] = [];
  calendarWeekName: string[] = [];
  // select;
  selectStartDate: CalendarDayPicker | undefined;
  selectLastDate: CalendarDayPicker | undefined;

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private crdp: CompackDatePickerService
  ) { }

  ngAfterViewInit() {
    this.loadTemplate();
  }

  ngOnInit() {
    moment.locale('ru');
    this.calendarWeekName = this.crdp.getNameDayOfWeek(this.locale);
    this.selectedMin = 0;
    this.selectedHour = 0;
    this.setViewFormat();
    this.loadMonthData();
  }

  private setViewFormat() {
    if (this.useTime) {
      this.formatViewDateInPicker = 'DD.MM.YYYY HH:mm';
      if (this.formatOutputDate == undefined)
        this.formatOutputDate = 'DD.MM.YYYY HH:mm'
    }
    else {
      this.formatViewDateInPicker = 'DD.MM.YYYY';
      if (this.formatOutputDate == undefined)
        this.formatOutputDate = 'DD.MM.YYYY'
    }
  }

  @HostListener('document:click', ['$event'])
  public onClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.menuIsVisiblr = false;
    }
  }

  public changeHour() {
    if (this.selectedHour > 23)
      this.selectedHour = 0;

    if (this.selectedHour < 0)
      this.selectedHour = 23;

    if (this.selectLastDate !== undefined && this.selectLastDate.fulDate != undefined) {
      this.selectLastDate.fulDate.hour(this.selectedHour);
    } else {
      if (this.selectStartDate !== undefined && this.selectStartDate.fulDate != undefined) {
        this.selectStartDate.fulDate.hour(this.selectedHour);
      }
    }
  }

  public changeMin() {
    if (this.selectedMin > 59)
      this.selectedMin = 0;

    if (this.selectedMin < 0)
      this.selectedMin = 59;

    if (this.selectLastDate !== undefined && this.selectLastDate.fulDate != undefined) {
      this.selectLastDate.fulDate.minute(this.selectedMin);
    } else {
      if (this.selectStartDate !== undefined && this.selectStartDate.fulDate != undefined) {
        this.selectStartDate.fulDate.minute(this.selectedMin);
      }
    }
  }

  public loadTemplate() {
    switch (this.type) {
      case 'block': {
        this.choseTemplate = this.blockTemplate;
        this.isNeedViewFieldDate = true;
        break;
      }
      case 'line': {
        this.choseTemplate = this.lineTemplate;
        this.isNeedViewFieldDate = false;
        break;
      }
      case 'icon': {
        this.choseTemplate = this.iconTemplate;
        this.isNeedViewFieldDate = true;
        break;
      }
      default: {
        this.choseTemplate = this.blockTemplate
        this.isNeedViewFieldDate = true;
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

  private loadMonthData() {
    this.nameMonth = this.crdp.getNameMonth(this.selectedMonth, this.locale);
    this.calendar = this.crdp.getWeeksForCalendar(this.selectedMonth, this.selectedYear,
      this.locale, this.selectStartDate, this.selectLastDate, this.max, this.min);
  }

  setNewDate() {
    if (this.selectStartDate !== undefined && this.selectLastDate !== undefined) {
      this.selectLastDateEvent.emit([
        moment(this.selectStartDate.fulDate).format(this.formatOutputDate),
        moment(this.selectLastDate.fulDate).format(this.formatOutputDate)
      ]);
      this.menuIsVisiblr = !this.menuIsVisiblr;
    }
  }

  clearCalendar() {
    this.clearAllSelectDay();
    this.ngOnInit();
    this.selectLastDateEvent.emit(['reset', 'reset']);
  }

  selectDay(day: CalendarDayPicker) {
    if (day.isDayThisMonth && !day.isOutOfMaxMin) {
      if (this.selectStartDate !== undefined && this.selectLastDate !== undefined) {
        this.clearAllSelectDay();
        this.selectDay(day);
      } else {
        if (this.selectStartDate === undefined) {
          day.isSelected = true;
          this.selectStartDate = JSON.parse(JSON.stringify(day));
          if (this.selectStartDate)
            if (this.useTime) {
              this.selectedMin = 0;
              this.selectedHour = 0;
              this.selectStartDate.fulDate = moment(day.fulDate).minute(0).hour(0);
            } else {
              this.selectStartDate.fulDate = moment(day.fulDate);
            }
        } else {
          if (this.selectLastDate === undefined) {
            day.isSelected = true;
            this.selectLastDate = JSON.parse(JSON.stringify(day));
            if (this.selectLastDate) {
              if (this.useTime) {
                this.selectedMin = 59;
                this.selectedHour = 23;
                this.selectLastDate.fulDate = moment(day.fulDate).minute(59).hour(23);
              } else {
                this.selectLastDate.fulDate = moment(day.fulDate);
              }
              if (this.selectLastDate.fulDate != undefined) {
                if (this.selectLastDate.fulDate.isBefore(this.selectStartDate.fulDate)) {
                  this.clearAllSelectDay();
                  this.selectDay(day);
                } else {
                  if (this.maxChoseDay != undefined && this.selectLastDate.fulDate != undefined) {
                    const duration = moment.duration(this.selectLastDate.fulDate.diff(this.selectStartDate.fulDate));
                    if (duration.days() > this.maxChoseDay - 1) {
                      this.clearAllSelectDay();
                    } else {
                      this.selectRowIncludeInRange();
                    }
                  } else {
                    this.selectRowIncludeInRange();
                  }
                }
              }
            }
          }
        }
      }
    }
  }


  private selectRowIncludeInRange() {
    this.calendar = this.crdp.selectAllRowIncludeInRange(this.calendar, this.selectStartDate, this.selectLastDate);
  }

  private clearAllSelectDay() {
    for (const cal of this.calendar) {
      for (const day of cal.week) {
        day.isSelected = false;
        day.isIncludeRage = false;
      }
    }
    this.selectStartDate = undefined;
    this.selectLastDate = undefined;
  }


}
