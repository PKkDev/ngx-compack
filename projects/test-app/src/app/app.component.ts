import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CompackBannerService, CompackToastService, DisplayMessageConfig, TypeMessage, TypePositionMessage, TypeToast } from 'ngx-compack';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  public min = moment().add(-3, 'd');
  public max = moment().add(5, 'd');

  constructor(
    private cts: CompackToastService,
    private cbs: CompackBannerService
  ) { }

  ngOnInit() {
    this.cbs.setInfoColor('#000');
    this.cbs.setErrorColor('#fff');

    const config: DisplayMessageConfig = {
      message: 'this website is ' + '\n' + ' intended solely \n for testing functions',
      position: TypePositionMessage.BottomRight,
      typeMessage: TypeMessage.Info
    }
    setTimeout(() => { this.cbs.addNewMessage(config); }, 0);

    this.cts.setInfoColor('#fff')

    this.cts.emitNewNotif({ title: 'Error', message: 'Body Error', type: TypeToast.Error });
    this.cts.emitNewNotif({ title: 'Error', type: TypeToast.Error });
    this.cts.emitNewNotif({ title: 'Info', type: TypeToast.Info });
    this.cts.emitNewNotif({ title: 'Info', type: TypeToast.Info });
    this.cts.emitNewNotif({ title: 'Info', type: TypeToast.Info });
    this.cts.emitNewNotif({ title: 'Info', type: TypeToast.Info });
    this.cts.emitNewNotif({ title: 'Info', type: TypeToast.Info });
    this.cts.emitNewNotif({ title: 'Info', type: TypeToast.Info });
    this.cts.emitNewNotif({ title: 'Info', type: TypeToast.Info });
    

  }

  ngAfterViewInit() {
    // this.cbs.addNewMessage({ message: 'new test', position: TypePositionMessage.TopLeft, typeMessage: TypeMessage.Info });

    // setTimeout(() => {
    //   this.cbs.addNewMessage({ message: 'new new test', position: TypePositionMessage.BottomRight, typeMessage: TypeMessage.Info });
    // }, 5000)
  }
}
