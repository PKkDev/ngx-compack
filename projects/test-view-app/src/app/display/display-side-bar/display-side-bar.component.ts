import { Component } from '@angular/core';
import { CompackSideBarService } from 'ngx-compack';

@Component({
  selector: 'app-display-side-bar',
  templateUrl: './display-side-bar.component.html',
  styleUrls: ['./display-side-bar.component.scss']
})
export class DisplaySideBarComponent {

  constructor(private cm: CompackSideBarService) { }

  public onOpen() {

    this.cm.openSideBar(
      DisplaySideBarComponent,
      {
        title: 'test title',
        dialogWidth: '500px',
        viewCloseBtn: true
      },
      {
        test: 'test data'
      });
  }

}
