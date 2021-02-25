import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { DisplayMessage } from './model/display-message';
import { DisplayMessageConfig } from './model/display-message-config';
import { TypeMessage } from './model/type-message';
import { TypePositionMessage } from './model/type-position-message';

const mapColor: Map<string, string> = new Map<string, string>()
  .set('info', '#2196f3')
  .set('error', '#ff5252');

@Injectable()
export class CompackBannerMergeService {

  public newMessageEvent$: ReplaySubject<DisplayMessageConfig> = new ReplaySubject<DisplayMessageConfig>(1);

  public removeMessageEvent$: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  public setInfoColor(newInfoColor: string) {
    if (mapColor.has('info')) {
      mapColor.set('info', newInfoColor);
    }
  }

  public setErrorColor(newErrorColor: string) {
    if (mapColor.has('error')) {
      mapColor.set('error', newErrorColor);
    }
  }

  public mergeMessageConfig(messageConfig: DisplayMessageConfig): DisplayMessage | null {
    // console.log('messageConfig', messageConfig);

    if (messageConfig == null)
      return null;

    const result = new DisplayMessage();

    result.intervalView = messageConfig.intervalView;
    result.title = messageConfig.title;
    result.message = messageConfig.message;

    switch (messageConfig.typeMessage) {
      case TypeMessage.Error: {
        if (mapColor.has('error')) {
          const color = mapColor.get('error');
          result.color = color ? color : '#fff';
        }
        break;
      }
      case TypeMessage.Info: {
        if (mapColor.has('info')) {
          const color = mapColor.get('info');
          result.color = color ? color : '#fff';
        }
        break;
      }
      default: {
        if (mapColor.has('error')) {
          const color = mapColor.get('error');
          result.color = color ? color : '#fff';
        }
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
