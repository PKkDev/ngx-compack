import { Component } from '@angular/core';
import { CompackBannerService, TypePositionMessage } from 'ngx-compack';

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

  constructor(private cbs: CompackBannerService) { }

  public viewBanner() {
    const position: TypePositionMessage = (+this.bannerPosition) as TypePositionMessage;
    this.cbs.viewBanner(position, this.bannerMessage, this.bannerTitle, this.bannerViewTime)
  }
  public removeBanner() {
    this.cbs.removeBanner()
  }

}
