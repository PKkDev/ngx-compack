import { Component, OnInit } from '@angular/core';
import { CompackBannerService, DisplayMessageConfig, TypeMessage, TypePositionMessage } from 'ngx-compack';

@Component({
  selector: 'app-test-created',
  templateUrl: './test-created.component.html',
  styleUrls: ['./test-created.component.scss']
})
export class TestCreatedComponent implements OnInit {
  options: any;

  constructor(
    private cbs: CompackBannerService
  ) { }

  ngOnInit() {

    setTimeout(() => {
      this.cbs.removeMessage();
    }, 1000 * 5);

    const config: DisplayMessageConfig = {
      message: 'this website is ' + '\n' + ' intended solely \n for testing functions',
      position: TypePositionMessage.Top,
      typeMessage: TypeMessage.Error
    }

    setTimeout(() => {
      this.cbs.addNewMessage(config);
    }, 1000 * 10);

  }

}
