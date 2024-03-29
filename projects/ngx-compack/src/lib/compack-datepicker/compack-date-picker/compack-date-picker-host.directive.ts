import { ComponentRef, Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompackDateFormatService } from '../compack-date-format.service';
import { CompackDatePickerComponent } from './compack-date-picker.component';

@Directive({
  selector: '[compackDatePickerHost]'
})
export class CompackDatePickerHostDirective implements OnInit, OnDestroy {

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

  private onClickEv: (() => void) | undefined;
  private onKeyDownEv: (() => void) | undefined;
  private newDateSubs?: Subscription

  private calendar: ComponentRef<CompackDatePickerComponent> | undefined = undefined;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    public viewContainerRef: ViewContainerRef,
    private dfs: CompackDateFormatService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['locale']) {
      if (changes['locale'].currentValue == '') this.locale = 'en';
      try { new Date().toLocaleString(this.locale, { month: 'long' }); }
      catch (error) {
        this.locale = 'en';
        console.error(`invalide locale '${changes['locale'].currentValue}' - used 'en'`);
      }
      if (this.calendar) {
        this.calendar.instance.locale = this.locale;
        this.calendar.instance.ngOnChanges(changes);
      }
    }

    if (changes['disabled'] && this.calendar) {
      this.calendar.instance.disabled = this.disabled;
      this.calendar.instance.ngOnChanges(changes);
    }

    if (changes['rangeMode'] && this.calendar) {
      this.calendar.instance.rangeMode = this.rangeMode;
      this.calendar.instance.ngOnChanges(changes);
    }

    if (changes['viewFieldSelectedDate'] && this.calendar) {
      this.calendar.instance.viewFieldSelectedDate = this.viewFieldSelectedDate;
      this.calendar.instance.ngOnChanges(changes);
    }

    if (changes['useTime'] && this.calendar) {
      this.calendar.instance.useTime = this.useTime;
      this.calendar.instance.ngOnChanges(changes);
    }

    if (changes['autoSelect'] && this.calendar) {
      this.calendar.instance.autoSelect = this.autoSelect;
      this.calendar.instance.ngOnChanges(changes);
    }

    if (changes['maxChoseDay'] && this.calendar) {
      this.calendar.instance.maxChoseDay = this.maxChoseDay;
      this.calendar.instance.ngOnChanges(changes);
    }

    if (changes['max'] && this.calendar) {
      this.calendar.instance.max = this.max;
      this.calendar.instance.ngOnChanges(changes);
    }

    if (changes['min'] && this.calendar) {
      this.calendar.instance.min = this.min;
      this.calendar.instance.ngOnChanges(changes);
    }

    if (changes['formatOutputDate'] && this.calendar) {
      this.calendar.instance.formatOutputDate = this.formatOutputDate;
      this.calendar.instance.ngOnChanges(changes);
    }

    if (changes['setDateEvent'] && this.calendar) {
      this.calendar.instance.setDateEvent = this.setDateEvent;
      this.calendar.instance.ngOnChanges(changes);
    }
  }

  ngOnInit() {

    if (this.onKeyDownEv) this.onKeyDownEv();
    this.onKeyDownEv = this.renderer.listen(this.el.nativeElement, 'keydown', (event) => {
      event.preventDefault();
    });

    if (this.onClickEv) this.onClickEv();
    this.onClickEv = this.renderer.listen(this.el.nativeElement, 'click', (event) => {

      if (!this.calendar) {
        this.calendar = this.viewContainerRef.createComponent(CompackDatePickerComponent);

        this.calendar.instance.isDialog = true;
        this.calendar.instance.handlerRef = this.el;
        this.calendar.instance.changeDialogState();

        this.newDateSubs = this.calendar.instance.selectLastDateEvent
          .subscribe(next => {
            if (this.el.nativeElement instanceof HTMLInputElement) {
              const text = next[0] == 'reset'
                ? ''
                : this.rangeMode
                  ? this.useTime
                    ? `${this.calendar?.instance.selectStartDateStr} ${this.calendar?.instance.selectStartTimeStr} - ${this.calendar?.instance.selectLastDateStr} ${this.calendar?.instance.selectLastTimeStr}`
                    : `${this.calendar?.instance.selectStartDateStr} - ${this.calendar?.instance.selectLastDateStr}`
                  : this.useTime
                    ? `${this.calendar?.instance.selectStartDateStr} ${this.calendar?.instance.selectStartTimeStr}`
                    : `${this.calendar?.instance.selectStartDateStr}`;
              this.renderer.setProperty(this.el.nativeElement, 'value', text);
            }
            this.selectLastDateEvent.emit(next);
          });

        this.calendar.instance.locale = this.locale;
        this.calendar.instance.disabled = this.disabled;
        this.calendar.instance.rangeMode = this.rangeMode;
        this.calendar.instance.viewFieldSelectedDate = this.viewFieldSelectedDate;
        this.calendar.instance.useTime = this.useTime;
        this.calendar.instance.autoSelect = this.autoSelect;
        this.calendar.instance.maxChoseDay = this.maxChoseDay;
        this.calendar.instance.max = this.max;
        this.calendar.instance.min = this.min;
        this.calendar.instance.formatOutputDate = this.formatOutputDate;
        this.calendar.instance.setDateEvent = this.setDateEvent;
      }
      else
        this.calendar.instance.changeDialogState();
    });

  }

  ngOnDestroy() {
    if (this.onClickEv) this.onClickEv();
    if (this.onKeyDownEv) this.onKeyDownEv();
    this.newDateSubs?.unsubscribe();
    if (this.calendar) {
      this.calendar.destroy();
      this.calendar = undefined;
    }
  }

}
