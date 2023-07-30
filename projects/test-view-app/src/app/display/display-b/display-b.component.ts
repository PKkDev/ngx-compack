import { Component } from '@angular/core';
import { CompackBannerService, TypeMessage, TypePositionMessage } from 'ngx-compack';

@Component({
  selector: 'app-display-b',
  templateUrl: './display-b.component.html',
  styleUrls: ['./display-b.component.scss']
})
export class DisplayBComponent {

  public bannerViewTime = 10;
  public bannerTitle = '';
  public bannerMessage = '';
  public bannerPosition = 0;
  public bannerType = 0;
  public bannerErrorColor = '#ff5252';
  public bannerInfoColor = '#2196f3';

  constructor(private cbs: CompackBannerService) { }

  public setBannerErrorColor() {
    if (!this.bannerErrorColor.includes('#'))
      this.bannerErrorColor = `#${this.bannerErrorColor}`;
    this.cbs.setErrorColor(this.bannerErrorColor);
  }
  public setBannerInfoColor() {
    if (!this.bannerInfoColor.includes('#'))
      this.bannerInfoColor = `#${this.bannerInfoColor}`;
    this.cbs.setInfoColor(this.bannerInfoColor);
  }
  public viewBanner() {
    const type: TypeMessage = (+this.bannerType) as TypeMessage;
    const positon: TypePositionMessage = (+this.bannerPosition) as TypePositionMessage;
    this.cbs.viewBanner(type, positon, this.bannerMessage, this.bannerTitle, this.bannerViewTime)
  }
  public removeBanner() {
    this.cbs.removeBanner()
  }

}
