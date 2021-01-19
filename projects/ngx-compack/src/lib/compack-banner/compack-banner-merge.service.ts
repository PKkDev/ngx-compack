import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { DisplayMessage } from './model/display-message';
import { DisplayMessageConfig } from './model/display-message-config';
import { TypeMessage } from './model/type-message';
import { TypePositionMessage } from './model/type-position-message';

@Injectable({
  providedIn: 'root'
})
export class CompackBannerMergeService {

  public newMessageEvent$: ReplaySubject<DisplayMessageConfig> = new ReplaySubject<DisplayMessageConfig>(1);

  public removeMessageEvent$: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  public mergeMessageConfig(messageConfig: DisplayMessageConfig, infoColor: string, errorColor: string): DisplayMessage | null {
    // console.log('messageConfig', messageConfig);

    if (messageConfig == null)
      return null;

    const result = new DisplayMessage();

    result.intervalView = messageConfig.intervalView;
    result.title = messageConfig.title;
    result.message = messageConfig.message;

    switch (messageConfig.typeMessage) {
      case TypeMessage.Error: {
        result.color = errorColor;
        break;
      }
      case TypeMessage.Info: {
        result.color = infoColor;
        break;
      }
      default: {
        result.color = errorColor;
        break;
      }
    }

    switch (messageConfig.position) {
      case TypePositionMessage.Top: {
        result.positionClass = 'top';
        break;
      }
      case TypePositionMessage.TopLeft: {
        result.positionClass = 'top_left';
        break;
      }
      case TypePositionMessage.TopRight: {
        result.positionClass = 'top_right';
        break;
      }
      case TypePositionMessage.Middle: {
        result.positionClass = 'Middle';
        break;
      }
      case TypePositionMessage.Bottom: {
        result.positionClass = 'bottom';
        break;
      }
      case TypePositionMessage.BottomLeft: {
        result.positionClass = 'bottom_left';
        break;
      }
      case TypePositionMessage.BottomRight: {
        result.positionClass = 'bottom_right';
        break;
      }
      default: {
        result.positionClass = 'top_right';
        break;
      }
    }
    // console.log('message', result);
    return result;
  }

}
