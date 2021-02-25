import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Toast } from './model/toast';
import { ToastConfig } from './model/toast-config';
import { TypeToast } from './model/type-toast';

const mapColor: Map<string, string> = new Map<string, string>()
  .set('info', '#2196f3')
  .set('error', '#ff5252')
  .set('success', '#4caf50');

@Injectable()
export class CompackToastMergeService {

  public notifEmite$: ReplaySubject<ToastConfig> = new ReplaySubject<ToastConfig>(30);

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

  public setSuccessColor(newSuccessColor: string) {
    if (mapColor.has('success')) {
      mapColor.set('success', newSuccessColor);
    }
  }

  public mergeToastConfig(toastConfig: ToastConfig, newIndex: number): Toast | null {
    // console.log('messageConfig', messageConfig);

    if (toastConfig == null)
      return null;

    const result = new Toast();

    result.message = toastConfig.message;
    result.title = toastConfig.title;
    result.type = toastConfig.type;
    result.file = toastConfig.file;
    result.index = newIndex;

    switch (toastConfig.type) {
      case TypeToast.Error: {
        if (mapColor.has('error')) {
          const color = mapColor.get('error');
          result.color = color ? color : '#fff';
        }
        break;
      }
      case TypeToast.Info: {
        if (mapColor.has('info')) {
          const color = mapColor.get('info');
          result.color = color ? color : '#fff';
        }
        break;
      }
      case TypeToast.Success: {
        if (mapColor.has('success')) {
          const color = mapColor.get('success');
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


    // console.log('message', result);
    return result;
  }


}
