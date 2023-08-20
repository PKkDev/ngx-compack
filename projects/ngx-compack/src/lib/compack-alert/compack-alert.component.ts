import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { CompackAlertType, alertTypeIcon } from './compack-alert.constants';

@Component({
  selector: 'compack-alert',
  templateUrl: './compack-alert.component.html',
  styleUrls: ['./compack-alert.component.scss']
})
export class CompackAlertComponent implements AfterViewInit {

  @Input() type: CompackAlertType = 'info';
  @Input() message: string | undefined;
  @Input() viewIcon = true;

  @ViewChild('alertBody') alertBody!: ElementRef<any>;
  @ViewChild('iconBody') iconBody: ElementRef<any> | undefined;

  constructor(private renderer2: Renderer2) { }

  ngAfterViewInit() {
    this.setBacClass();
    if (this.viewIcon) {
      this.setIcon();
    }
  }

  private setIcon() {

    if (!this.iconBody) return;

    const icon = alertTypeIcon[this.type];

    const span = this.renderer2.createElement('span');
    this.renderer2.addClass(span, 'cmp-span-icon');
    span.innerHTML = icon;

    this.renderer2.appendChild(this.iconBody.nativeElement, span);
  }

  private setBacClass() {
    let className = '';

    switch (this.type) {
      case 'info':
        className = 'ngc-alert-info';
        break;
      case 'success':
        className = 'ngc-alert-success';
        break;
      case 'error':
        className = 'ngc-alert-error';
        break;
    }

    this.renderer2.addClass(this.alertBody.nativeElement, className);
  }

}
