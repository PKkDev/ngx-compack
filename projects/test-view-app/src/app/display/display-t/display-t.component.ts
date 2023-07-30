import { Component } from '@angular/core';
import { CompackToastService, TypeToast } from 'ngx-compack';

@Component({
  selector: 'app-display-t',
  templateUrl: './display-t.component.html',
  styleUrls: ['./display-t.component.scss']
})
export class DisplayTComponent {

  public toastType = 0;
  public toastTitle = '';
  public toastText = '';
  public toastTimeToDel = 15;
  public toastErrorColor = '#ff5252';
  public toastInfoColor = '#2196f3';
  public toastSuccessColor = '#4caf50';

  constructor(private cts: CompackToastService) { }

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

}
