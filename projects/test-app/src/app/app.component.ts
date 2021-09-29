import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { CompackBannerService, CompackToastService, DisplayMessageConfig, TypeMessage, TypePositionMessage, TypeToast } from 'ngx-compack';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  public type = 'block';
  public formatOutputDate = 'DD.MM.YYYYTHH:mm';
  public locale = 'ru';
  public useTime = true;
  public rangeMode = true;
  public viewFieldSelectedDate = true;
  public maxChoseDay = 5;

  public min: Moment | undefined = undefined;
  public max: Moment | undefined = undefined;

  public selectedDatesStr: string = 'none';

  constructor(
    private cts: CompackToastService,
    private cbs: CompackBannerService
  ) { }

  ngOnInit() {

    this.cbs.setInfoColor('#fff');
    this.cbs.setErrorColor('#fff');

    const config: DisplayMessageConfig = {
      message: 'this website is sdsd sdsd sdfsdf sdfsd ' + '\n' + ' intended solely \n for testing functions',
      position: TypePositionMessage.BottomRight,
      typeMessage: TypeMessage.Info
    }
    setTimeout(() => { this.cbs.viewBanner(config.typeMessage, config.position, config.message); }, 0);

    this.cts.setInfoColor('#fff')

    this.cts.emitNotife(TypeToast.Error, 'ErrorError Error Error Error Errorv Error Error Error', 'Body Error Body Error Body Error Body ErrorBody ErrorBody Error vBody Error');
    this.cts.emitNotife(TypeToast.Error, 'Error Error ErrorError ErrorErrorErrorErrorError vErrorError Error Error');
    this.cts.emitNotife(TypeToast.Info, 'Info');
    this.cts.emitNotife(TypeToast.Info, 'Info');
    this.cts.emitNotife(TypeToast.Info, 'Info');
    this.cts.emitNotife(TypeToast.Info, 'Info');
    this.cts.emitNotife(TypeToast.Info, 'Info');
    this.cts.emitNotife(TypeToast.Info, 'Info');
    this.cts.emitNotife(TypeToast.Info, 'Info');


  }

  ngAfterViewInit() {
    // this.cbs.addNewMessage({ message: 'new test', position: TypePositionMessage.TopLeft, typeMessage: TypeMessage.Info });

    // setTimeout(() => {
    //   this.cbs.addNewMessage({ message: 'new new test', position: TypePositionMessage.BottomRight, typeMessage: TypeMessage.Info });
    // }, 5000)
  }

  public selectLastDateEvent(selected: string[]) {
    console.log('selected', selected);

    if (selected.length == 1) {
      this.selectedDatesStr = selected[0];
      return;
    }
    if (selected.length == 2) {
      this.selectedDatesStr = selected[0] + '-' + selected[1];
      return;
    }
    this.selectedDatesStr = 'none';
  }

  public selectMinDateEvent(selected: string[]) {
    this.min = moment(selected[0], 'DD.MM.YYYY');
  }

  public selectMaxDateEvent(selected: string[]) {
    this.max = moment(selected[0], 'DD.MM.YYYY');
  }

}
