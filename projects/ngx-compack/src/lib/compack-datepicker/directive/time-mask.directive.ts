import { Directive, ElementRef, forwardRef, HostListener, Renderer2, Self } from '@angular/core';
import { FormControl, NgModel, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';

@Directive({
  selector: '[appTimeMask]',
  providers: [NgModel]
})
export class TimeMaskDirective {

  constructor(
    private _el: ElementRef,
    private _renderer: Renderer2,
    private ngModel: NgModel) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(evt: KeyboardEvent) {

    const key = evt.key;
    if (key == 'Backspace') { //  || key == 'Delete'
      this._checkDeleted(key, evt);
    } else {
      if (key == 'ArrowLeft' || key == 'ArrowRight') {
      } else {
        if (+key >= 0)
          this._setInputText(key, evt);
        else
          evt.preventDefault();
      }
    }
  }

  private _checkDeleted(key: string, evt: KeyboardEvent) {
    const oldValue = this._el.nativeElement.value;
    const arr = oldValue.split(':');
    if (arr[0] && arr[1]) {
      let caretPosition = this._el.nativeElement.selectionStart;
      const deletedSymbol = this._el.nativeElement.value[caretPosition - 1];
      if (deletedSymbol == ':')
        evt.preventDefault();
    }
  }


  private _setInputText(key: string, evt: KeyboardEvent) {
    const oldValue = this._el.nativeElement.value;

    let caretPosition = this._el.nativeElement.selectionStart;
    let newTime = oldValue.slice(0, caretPosition) + key + oldValue.slice(caretPosition, oldValue.length);

    if (caretPosition != this._el.nativeElement.selectionEnd)
      evt.preventDefault();

    if (newTime.length > 5)
      return;

    console.log('insert into: ', oldValue, 'value: ', key, 'and res: ', newTime);

    if (newTime.length > 2 && !oldValue.includes(':')) {
      caretPosition++;
      newTime = newTime.slice(0, 2) + ':' + newTime.slice(2, 4);
    }

    if (newTime.length == 1)
      if (+key > 2) {
        newTime = `0${key}:`;
        caretPosition += 2;
      }

    const arr = newTime.split(':');
    console.log('splited arr: ', arr);

    var hour = arr[0];
    let newHour = hour ?? '';
    if (hour)
      if (+hour > 23)
        newHour = '23';

    var min = arr[1];
    let newMin = min ?? '';
    if (min) {
      if (+min > 59)
        newMin = '59';
      if (+min > 5 && +min < 10 && min.length == 1) {
        newMin = `0${min}`;
        caretPosition += 2;
      }
    }

    if (newHour.length == 2) caretPosition++;

    newTime = `${newHour}:${newMin}`;
    this.updateValue(newTime, evt);

    this._el.nativeElement.selectionStart = caretPosition + 1;
    this._el.nativeElement.selectionEnd = caretPosition + 1;

  }

  private updateValue(newTime: string, evt: KeyboardEvent) {
    console.log('newValue', newTime);
    this._renderer.setProperty(this._el.nativeElement, 'value', newTime);
    this.ngModel.update.emit(newTime);
    evt.preventDefault();
  }

}