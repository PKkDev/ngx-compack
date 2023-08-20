import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CompackBannerMergeService } from './compack-banner-merge.service';
import { DisplayMessage } from './model/display-message';
import { DisplayMessageConfig } from './model/display-message-config';

@Component({
  selector: 'compack-banner',
  templateUrl: './compack-banner.component.html',
  styleUrls: ['./compack-banner.component.scss'],
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1, boxShadow: '0px 0px 10px 0px rgba(34, 60, 80, 0.2)' }))
      ]),
      transition(':leave', [
        animate(500, style({ opacity: 0, boxShadow: 'none' }))
      ])
    ])
  ]
})
export class CompackBannerComponent implements OnInit, OnDestroy {
  // config position
  public positionClass = 'top';

  // data
  public displayMessage: DisplayMessage | null = null;
  private timeOutView: any;
  private intervalView: any;
  public counterClose = -1;

  public viewIndicatorWidth = '0';

  constructor(
    private cdr: ChangeDetectorRef,
    private compackBannerService: CompackBannerMergeService) { }

  ngOnInit() {

    this.compackBannerService.newMessageEvent$
      .subscribe(
        (data: DisplayMessageConfig | null) => {
          if (data != null) {
            this.removeMessage();
            this.displayMessage = this.compackBannerService.mergeMessageConfig(data);
            if (this.displayMessage != null) {
              this.positionClass = this.displayMessage.positionClass;
              this.cdr.detectChanges();
              if (this.displayMessage.intervalView != null) {
                this.counterClose = this.displayMessage.intervalView;
                this.setTimerView(this.displayMessage.intervalView)
                this.setIntervalAutoClose()
              }
            }
          }
        }
      );

    this.compackBannerService.removeMessageEvent$
      .subscribe(
        (next: boolean) => {
          this.removeMessage();
        }
      )
  }

  ngOnDestroy() {
    this.destroyTimer()
  }

  public removeMessage() {
    this.displayMessage = null;
    this.destroyTimer();
    this.viewIndicatorWidth = '0';
  }

  private setIntervalAutoClose() {
    this.intervalView = setInterval(() => {
      this.counterClose--;

      if (this.displayMessage && this.displayMessage.intervalView) {
        this.viewIndicatorWidth = `${100 - (this.counterClose / this.displayMessage.intervalView * 100)}%`;
      }

    }, 1000);
  }

  private setTimerView(interval: number) {
    this.timeOutView = setTimeout(() => {
      this.displayMessage = null;
      this.viewIndicatorWidth = '0';
    }, 1000 * (interval + 1))
  }

  private destroyTimer() {
    if (this.timeOutView != null) {
      clearTimeout(this.timeOutView);
    }
    if (this.intervalView != null) {
      clearInterval(this.intervalView);
      this.counterClose = -1;
    }
  }


}
