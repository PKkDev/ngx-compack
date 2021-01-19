import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CompackBannerService, CompackToastService, DisplayMessageConfig, TypeToast } from 'ngx-compack';
import { TypeMessage, TypePositionMessage } from 'ngx-compack';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  public min = moment().add(-3, 'd');
  public max = moment().add(5, 'd');

  constructor(
    private cts: CompackToastService,
    private cbs: CompackBannerService
  ) {
  }

  ngOnInit() {
    const config: DisplayMessageConfig = {
      message: 'данный web сайт предназанчен исключительно для тестирования функций',
      position: TypePositionMessage.TopRight,
      typeMessage: TypeMessage.Info
    }
    this.cbs.addNewMessage(config);

    this.cts.emitNewNotif({ title: 'Ошибка', message: 'Тело ошибки', type: TypeToast.Error });
    this.cts.emitNewNotif({ title: 'Ошибка', message: 'Тело ошибки', type: TypeToast.Error });
    this.cts.emitNewNotif({ title: 'Ошибка', message: 'Тело ошибки', type: TypeToast.Error });
    this.cts.emitNewNotif({ title: 'Ошибка', type: TypeToast.Error });
    this.cts.emitNewNotif({ title: 'Информация', message: 'Тело информации', type: TypeToast.Info });
    this.cts.emitNewNotif({ title: 'Информация Информация Информация Информация Информация', type: TypeToast.Info })
    this.cts.emitNewNotif({ title: 'Информация', message: 'Тело информации', type: TypeToast.Info })
    this.cts.emitNewNotif({ title: 'Информация', message: 'Тело информации', type: TypeToast.Info })
    this.cts.emitNewNotif({ title: 'Успешно', message: 'Тело операции', type: TypeToast.Success });
    this.cts.emitNewNotif({ title: 'Успешно', type: TypeToast.Success });
    this.cts.emitNewNotif({ title: 'Успешно', message: 'Тело операции', type: TypeToast.Success, file: { fileName: 's', file: new Blob() } });

  }
}
