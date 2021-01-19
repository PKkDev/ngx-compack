import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Toast } from './model/toast';
import { ToastConfig } from './model/toast-config';
import { TypeToast } from './model/type-toast';

@Injectable({
  providedIn: 'root'
})
export class CompackToastMergeService {

  public notifEmite$: ReplaySubject<ToastConfig> = new ReplaySubject<ToastConfig>(3);

  constructor() { }

  public mergeToastConfig(toastConfig: ToastConfig, newIndex: number, infoColor: string, errorColor: string, succesColor: string): Toast | null {
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
        result.color = errorColor;
        break;
      }
      case TypeToast.Info: {
        result.color = infoColor;
        break;
      }
      case TypeToast.Success: {
        result.color = succesColor;
        break;
      }
      default: {
        result.color = errorColor;
        break;
      }
    }


    // console.log('message', result);
    return result;
  }


}
