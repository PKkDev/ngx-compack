import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Toast } from './model/toast';
import { ToastConfig } from './model/toast-config';

@Injectable()
export class CompackToastMergeService {

  private timeToDel = 15;

  public viewNotification$: ReplaySubject<ToastConfig> = new ReplaySubject<ToastConfig>(30);

  public setTimeToAutoRemove(time: number) {
    if (+time >= 0)
      this.timeToDel = time;
    else
      this.timeToDel = 15;
  }

  public mergeToastConfig(toastConfig: ToastConfig, newIndex: number): Toast | null {
    // console.log('toastConfig', toastConfig);

    if (toastConfig == null)
      return null;

    const result = new Toast();

    result.message = toastConfig.message;
    result.title = toastConfig.title;
    result.type = toastConfig.type;
    result.index = newIndex;
    result.timeToDel = this.timeToDel;

    return result;
  }

}
