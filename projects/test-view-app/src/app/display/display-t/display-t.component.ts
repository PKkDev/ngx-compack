import { Component, OnInit } from '@angular/core';
import { CompackToastService, TypeToast } from 'ngx-compack';

@Component({
  selector: 'app-display-t',
  templateUrl: './display-t.component.html',
  styleUrls: ['./display-t.component.scss']
})
export class DisplayTComponent implements OnInit {

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

  constructor(private cts: CompackToastService) { }

  ngOnInit() {
  }

}
