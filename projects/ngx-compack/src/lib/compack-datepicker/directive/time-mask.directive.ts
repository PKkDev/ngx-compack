import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ngModel][timeMask]'
})
export class TimeMaskDirective {

  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  constructor(
    private _el: ElementRef,
    private _renderer: Renderer2) { }

  @HostListener('dragstart', ['$event'])
  onDragstart(evt: DragEvent) {
    evt.preventDefault();
  }

  @HostListener('mousewheel', ['$event'])
  onMousewheel(evt: WheelEvent) {
    const value = this._el.nativeElement.value;
    if (value.length > 0) {
      const arr = value.split(':');
      if (arr[0] && arr[1]) {

        let hour = +arr[0];
        let min = +arr[1];

        if (evt.deltaY > 0) {
          min--;
          if (min < 0) {
            hour--;
            min = 60;
            if (hour < 0)
              hour = 24;
          }
        } else {
          min++;
          if (min > 60) {
            hour++;
            min = 0;
            if (hour > 24)
              hour = 0;
          }
        }

        const newMin = min >= 10 ? `${min}` : `0${min}`;
        const newHour = hour >= 10 ? `${hour}` : `0${hour}`;
        const newTime = `${newHour}:${newMin}`;
        this._renderer.setProperty(this._el.nativeElement, 'value', newTime);
        this.ngModelChange.emit(newTime);
      }
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(evt: KeyboardEvent) {

    const selectionStart = this._el.nativeElement.selectionStart;
    const selectionEnd = this._el.nativeElement.selectionEnd;
    const valueLength = this._el.nativeElement.value.length;
    if (selectionEnd - selectionStart == valueLength)
      this._el.nativeElement.value = '';

    const key = evt.key;
    if (key == 'Backspace') { // || key == 'Delete'
      this._checkDeleted(key, evt);
    } else {
      if (key == 'ArrowLeft' || key == 'ArrowRight') {
      } else {
        if (key != ' ' && +key >= 0)
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
      const caretPosition = this._el.nativeElement.selectionStart;
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

    // console.log('insert into: ', oldValue, 'value: ', key, 'and res: ', newTime);

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
    // console.log('splited arr: ', arr);

    let hour = arr[0];
    let newHour = hour ?? '';
    if (hour)
      if (+hour > 23)
        newHour = '23';

    let min = arr[1];
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
    // console.log('newValue', newTime);
    this._renderer.setProperty(this._el.nativeElement, 'value', newTime);
    this.ngModelChange.emit(newTime);
    evt.preventDefault();
  }

}
