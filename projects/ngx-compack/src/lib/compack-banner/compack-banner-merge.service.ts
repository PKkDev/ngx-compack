import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DisplayMessage } from './model/display-message';
import { DisplayMessageConfig } from './model/display-message-config';
import { TypePositionMessage } from './model/type-position-message';

@Injectable()
export class CompackBannerMergeService {

  public newMessageEvent$: BehaviorSubject<DisplayMessageConfig | null> = new BehaviorSubject<DisplayMessageConfig | null>(null);

  public removeMessageEvent$: EventEmitter<boolean> = new EventEmitter();

  public mergeMessageConfig(messageConfig: DisplayMessageConfig): DisplayMessage | null {
    // console.log('messageConfig', messageConfig);

    if (messageConfig == null)
      return null;

    const result = new DisplayMessage();

    result.intervalView = messageConfig.intervalView;
    result.title = messageConfig.title;
    result.message = messageConfig.message;

    switch (messageConfig.position) {
      case TypePositionMessage.Top:
        result.positionClass = 'top'; break;
      case TypePositionMessage.TopLeft:
        result.positionClass = 'top_left'; break;
      case TypePositionMessage.TopRight:
        result.positionClass = 'top_right'; break;
      case TypePositionMessage.Middle:
        result.positionClass = 'Middle'; break;
      case TypePositionMessage.Bottom:
        result.positionClass = 'bottom'; break;
      case TypePositionMessage.BottomLeft:
        result.positionClass = 'bottom_left'; break;
      case TypePositionMessage.BottomRight:
        result.positionClass = 'bottom_right'; break;
      default:
        result.positionClass = 'top_right'; break;

    }
    // console.log('message', result);
    return result;
  }

}
