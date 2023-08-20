import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CompackToastMergeService } from './compack-toast-merge.service';
import { Toast } from './model/toast';
import { ToastConfig } from './model/toast-config';
import { PlaceToast } from './model/place-toast';

@Component({
  selector: 'compack-toast',
  templateUrl: './compack-toast.component.html',
  styleUrls: ['./compack-toast.component.scss'],
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate(1000)
      ]),
      transition(':leave', [
        animate(1000, style({ opacity: '0' }))
      ])
    ])
  ]
})
export class CompackToastComponent implements OnInit, OnDestroy {
  // data
  public listMessages: Toast[] = [];

  // config
  public placeToast: PlaceToast = PlaceToast.TopRight;

  // container
  @ViewChild('notificationContainer', { static: false }) notificationContainer!: ElementRef<any>;

  // type template
  @ViewChild('messageWithFileTemplate', { static: false }) messageWithFileTemplate!: TemplateRef<any>;
  @ViewChild('messageOnlyTextTemplate', { static: false }) messageOnlyTextTemplate!: TemplateRef<any>;

  constructor(
    private cdr: ChangeDetectorRef,
    private ctms: CompackToastMergeService) { }

  ngOnInit() {

    this.ctms.viewNotification$
      .subscribe((next: ToastConfig) => {
        if (next !== null) {
          const newIndex = +(new Date());
          const newToast = this.ctms.mergeToastConfig(next, newIndex);
          if (newToast != null) {

            if (this.listMessages.length > 5) {
              this.removeMessage(this.listMessages[0].index);
            }

            this.listMessages.push(newToast);
            this.setTimerToDel(newIndex, newToast.timeToDel);
            setTimeout(() => {
              if (this.notificationContainer) {
                const container = this.notificationContainer.nativeElement;
                container.scrollTop = container.scrollHeight - container.clientHeight;
              }
            }, 1000);
          }
          this.cdr.detectChanges();
        }
      });

  }

  ngOnDestroy() {
    this.listMessages = [];
  }

  public loadTemplate(mess: Toast) {
    return this.messageOnlyTextTemplate;
  }

  private setTimerToDel(index: number, interval: number) {
    setTimeout(() => (this.autoRemoveLastMessage(index)), 1000 * interval);
  }

  private autoRemoveLastMessage(index: number) {
    if (this.listMessages.length !== 0) {
      const res = this.listMessages.findIndex(x => x.index === index);
      if (res !== -1)
        this.listMessages.splice(res, 1);
    }
  }

  public removeMessage(index: number) {
    const res = this.listMessages.findIndex(x => x.index === index);
    this.listMessages.splice(res, 1);
  }

}
