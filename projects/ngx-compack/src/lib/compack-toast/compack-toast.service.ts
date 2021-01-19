import { Injectable } from '@angular/core';
import { CompackToastMergeService } from './compack-toast-merge.service';
import { ToastConfig } from './model/toast-config';

@Injectable({
  providedIn: 'root'
})
export class CompackToastService {

  constructor(private ctms: CompackToastMergeService) { }

  public emitNewNotif(message: ToastConfig) {
    this.ctms.notifEmite$.next(message);
  }

}
