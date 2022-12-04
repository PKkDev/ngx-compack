import { Component, OnInit } from '@angular/core';
import { CompackBannerService, TypeMessage, TypePositionMessage } from 'ngx-compack';

@Component({
  selector: 'app-display-b',
  templateUrl: './display-b.component.html',
  styleUrls: ['./display-b.component.scss']
})
export class DisplayBComponent implements OnInit {

  public bannerViewTime: number = 10;
  public bannerTitle: string = '';
  public bannerMessage: string = '';
  public bannerPosition: number = 0;
  public bannerType: number = 0;
  public bannerErrorColor: string = '#ff5252';
  public bannerInfoColor: string = '#2196f3';

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

  constructor(private cbs: CompackBannerService) { }

  ngOnInit() {
  }

}
