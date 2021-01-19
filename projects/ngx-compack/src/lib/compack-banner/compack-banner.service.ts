import { Injectable } from '@angular/core';
import { CompackBannerMergeService } from './compack-banner-merge.service';
import { DisplayMessageConfig } from './model/display-message-config';

@Injectable({
  providedIn: 'root'
})
export class CompackBannerService {

  constructor(private cbms: CompackBannerMergeService) {
  }

  public addNewMessage(messConfig: DisplayMessageConfig) {
    this.cbms.newMessageEvent$.next(messConfig);
  }

  public removeMessage() {
    this.cbms.removeMessageEvent$.emit(true);
  }

}
