import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CompackToastMergeService } from './compack-toast-merge.service';
import { Toast } from './model/toast';
import { ToastConfig } from './model/toast-config';

@Component({
  selector: 'compack-toast',
  templateUrl: './compack-toast.component.html',
  styleUrls: ['./compack-toast.component.scss'],
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: '0' }),
        animate(1000)
      ]),
      transition(':leave', [
        animate(1000, style({ transform: 'translateX(100%)', opacity: '0' }))
      ])
    ])
  ]
})
export class CompackToastComponent implements OnInit, OnDestroy {
  // data
  private index = 0;
  public listMessages: Toast[] = [];
  // type template
  @ViewChild('messageWithFileTemplate', { static: false })
  messageWithFileTemplate!: TemplateRef<any>;
  @ViewChild('messageOnlyTextTemplate', { static: false })
  messageOnlyTextTemplate!: TemplateRef<any>;


  constructor(
    private cdr: ChangeDetectorRef,
    private ctms: CompackToastMergeService) {
  }

  ngOnInit() {

    this.ctms.notifEmite$
      .subscribe((next: ToastConfig) => {
        if (next !== null) {
          const newIndex = this.index++;
          const newToast = this.ctms.mergeToastConfig(next, newIndex)
          if (newToast != null) {
            this.listMessages.push(newToast);
            this.setTimerToDel(newIndex);
            setTimeout(() => {
              const container = document.getElementById('notif-container');
              if (container != null)
                container.scrollTop = container.scrollHeight - container.clientHeight;
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
    if (mess.file !== undefined) {
      return this.messageWithFileTemplate;
    } else {
      return this.messageOnlyTextTemplate;
    }
  }

  public downloadFile(blob: Blob, fileName: string) {
    // console.log(blob, fileName);
    // saveAs(blob, fileName);
  }

  private setTimerToDel(index: number) {
    setTimeout(() => (this.autoRemoveLastMessage(index)), 1000 * 15);
  }

  private autoRemoveLastMessage(index: number) {
    if (this.listMessages.length !== 0) {
      const res = this.listMessages.findIndex(x => x.index === index);
      if (res !== -1) {
        if (this.listMessages[res].file == null)
          this.listMessages.splice(res, 1);
      }
    }
  }

  public removeMessage(index: number) {
    const res = this.listMessages.findIndex(x => x.index === index);
    this.listMessages.splice(res, 1);
  }

}
