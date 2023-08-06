import { Component } from '@angular/core';
import { CompackToastService, TypeToast } from 'ngx-compack';

@Component({
  selector: 'app-display-t',
  templateUrl: './display-t.component.html',
  styleUrls: ['./display-t.component.scss']
})
export class DisplayTComponent {

  public type = TypeToast.Error;
  public title: string | undefined;
  public text: string | undefined;
  public timeToDel = 15;

  constructor(private cts: CompackToastService) { }

  public setToastTimeToDel() {
    this.cts.setTimeToAutoRemove(this.timeToDel);
  }

  public viewToast() {
    if (this.title) {
      const type = (+this.type) as TypeToast;
      this.cts.view(type, this.title, this.text);
    }
  }

}
