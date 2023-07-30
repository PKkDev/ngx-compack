import { ComponentRef, Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompackRelativeDateModel } from '../model/compack-relative-date-model';
import { CompackDatePickerRangeComponent } from './compack-date-picker-range.component';

@Directive({
  selector: '[compackDatePickerRangeHost]'
})
export class CompackDatePickerRangeHostDirective implements OnInit, OnDestroy {

  // events
  @Output() selectLastDateEvent = new EventEmitter<string[]>();
  // input config
  @Input() locale = 'en';
  @Input() disabled = false;
  @Input() formatOutputDate = `dd.mm.yyyy`;
  @Input() relativeDateModel: CompackRelativeDateModel[] | undefined = undefined;

  private onClickEv: (() => void) | undefined;
  private onKeyDownEv: (() => void) | undefined;
  private newDateSubs: Subscription

  private calendar: ComponentRef<CompackDatePickerRangeComponent> | undefined = undefined;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    public viewContainerRef: ViewContainerRef) { }

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

    if (changes['formatOutputDate'] && this.calendar) {
      this.calendar.instance.formatOutputDate = this.formatOutputDate;
      this.calendar.instance.ngOnChanges(changes);
    }

    if (changes['relativeDateModel'] && this.calendar) {
      this.calendar.instance.relativeDateModel = this.relativeDateModel;
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
        this.calendar = this.viewContainerRef.createComponent(CompackDatePickerRangeComponent);

        this.calendar.instance.isDialog = true;
        this.calendar.instance.handlerRef = this.el;
        this.calendar.instance.changeDialogState();

        this.newDateSubs = this.calendar.instance.selectLastDateEvent
          .subscribe(next => {
            if (this.el.nativeElement instanceof HTMLInputElement) {
              const text = next[0] == 'reset'
                ? ''
                : `${next[0]} - ${next[1]}`;
              this.renderer.setProperty(this.el.nativeElement, 'value', text);
            }
            this.selectLastDateEvent.emit(next);
          });

        this.calendar.instance.locale = this.locale;
        this.calendar.instance.disabled = this.disabled;
        this.calendar.instance.formatOutputDate = this.formatOutputDate;
        this.calendar.instance.relativeDateModel = this.relativeDateModel;
      }
      else
        this.calendar.instance.changeDialogState();
    });

  }

  ngOnDestroy() {
    if (this.onClickEv) this.onClickEv();
    if (this.onKeyDownEv) this.onKeyDownEv();
    if (this.newDateSubs) this.newDateSubs.unsubscribe();
    if (this.calendar) {
      this.calendar.destroy();
      this.calendar = undefined;
    }
  }

}
