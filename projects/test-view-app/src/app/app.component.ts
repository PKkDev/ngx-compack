import { ChangeDetectorRef, Component, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { CompackBannerService, CompackToastService, TypeMessage, TypePositionMessage, TypeToast } from 'ngx-compack';
import * as moment from 'moment';
import { Moment } from 'moment';

export enum TypeViewComponent {
  Picker = 0,
  Toast = 1,
  Banner = 2
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  public viewComponent = TypeViewComponent.Picker;
  selectedTemplate: TemplateRef<any> | null = null;
  @ViewChild('picker') picker: TemplateRef<any> | undefined;
  @ViewChild('toast') toast: TemplateRef<any> | undefined;
  @ViewChild('banner') banner: TemplateRef<any> | undefined;

  constructor(
    private cts: CompackToastService,
    private cbs: CompackBannerService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    // setTimeout(() => this.cbs.viewBanner(TypeMessage.Info, TypePositionMessage.TopRight, 'asdas'), 0)
  }

  ngAfterViewInit() {
    this.viewComponent = TypeViewComponent.Picker;
    this.selectedTemplate = this.picker ?? null;
    this.cdr.detectChanges();
  }

  public loadTemplate(newView: TypeViewComponent) {
    this.viewComponent = newView;
    switch (newView) {
      case TypeViewComponent.Picker:
        this.selectedTemplate = this.picker ?? null;
        break;
      case TypeViewComponent.Toast:
        this.selectedTemplate = this.toast ?? null;
        break;
      case TypeViewComponent.Banner:
        this.selectedTemplate = this.banner ?? null;
        break;
      default:
        this.selectedTemplate = this.picker ?? null;
        break;
    }
    this.cdr.detectChanges();
  }

  public setDateEvent: EventEmitter<string[]> = new EventEmitter<string[]>();
  public OnSetDate() {
    this.setDateEvent.next(['08.07.2022T05:45', '18.07.2022T15:55']);
  }
  public type = 'block';
  public formatOutputDate = 'DD.MM.YYYYTHH:mm';
  public locale = 'ru';
  public useTime = true;
  public rangeMode = false;
  public disabled = false;
  public autoSelect = false;
  public viewFieldSelectedDate = true;
  public maxChoseDay = 5;
  public min: Moment | undefined = undefined;
  public max: Moment | undefined = undefined;
  public selectedDateOneStr: string = 'none';
  public selectedDateTwoStr: string = 'none'
  // public initialSelectedDate: string[] | undefined = ['asd'];
  public selectLastDateEvent(selected: string[]) {
    this.selectedDateOneStr = 'none';
    this.selectedDateTwoStr = 'none';
    if (selected.length == 1) {
      this.selectedDateOneStr = selected[0];
      return;
    }
    if (selected.length == 2) {
      this.selectedDateOneStr = selected[0];
      this.selectedDateTwoStr = selected[1];
      return;
    }
    this.selectedDateOneStr = 'error';
    this.selectedDateTwoStr = 'error';
  }
  public selectMinDateEvent(selected: string[]) {
    this.min = moment(selected[0], 'DD.MM.YYYY');
  }
  public selectMaxDateEvent(selected: string[]) {
    this.max = moment(selected[0], 'DD.MM.YYYY');
  }

  public toastType: number = 0;
  public toastTitle: string = '';
  public toastText: string = '';
  public toastTimeToDel: number = 15;
  public toastErrorColor: string = '#ff5252';
  public toastInfoColor: string = '#2196f3';
  public toastSuccessColor: string = '#4caf50';

  public setToastErrorColor() {
    if (!this.toastErrorColor.includes('#'))
      this.toastErrorColor = `#${this.toastErrorColor}`;
    this.cts.setErrorColor(this.toastErrorColor);
  }
  public setToastInfoColor() {
    if (!this.toastInfoColor.includes('#'))
      this.toastInfoColor = `#${this.toastInfoColor}`;
    this.cts.setInfoColor(this.toastInfoColor);
  }
  public setToastSuccessColor() {
    if (!this.toastSuccessColor.includes('#'))
      this.toastSuccessColor = `#${this.toastSuccessColor}`;
    this.cts.setSuccessColor(this.toastSuccessColor);
  }
  public setToastTimeToDel() {
    this.cts.setTimeToAutoRemove(this.toastTimeToDel);
  }
  public viewToast() {
    const type: TypeToast = (+this.toastType) as TypeToast;
    this.cts.emitNotife(type, this.toastTitle, this.toastText);
  }


  public bannerViewTime: number = 10;
  public bannerTitle: string = '';
  public bannerMessage: string = '';
  public bannerPosition: number = 0;
  public bannerType: number = 0;
  public bannerErrorColor: string = '#ff5252';
  public bannerInfoColor: string = '#2196f3';

  public setBannerErrorColor() {
    if (!this.bannerErrorColor.includes('#'))
      this.bannerErrorColor = `#${this.bannerErrorColor}`;
    this.cbs.setErrorColor(this.bannerErrorColor);
  }
  public setBannerInfoColor() {
    if (!this.bannerInfoColor.includes('#'))
      this.bannerInfoColor = `#${this.bannerInfoColor}`;
    this.cbs.setInfoColor(this.bannerInfoColor);
  }
  public viewBanner() {
    const type: TypeMessage = (+this.bannerType) as TypeMessage;
    const positon: TypePositionMessage = (+this.bannerPosition) as TypePositionMessage;
    this.cbs.viewBanner(type, positon, this.bannerMessage, this.bannerTitle, this.bannerViewTime)
  }
  public removeBanner() {
    this.cbs.removeBanner()
  }


}
