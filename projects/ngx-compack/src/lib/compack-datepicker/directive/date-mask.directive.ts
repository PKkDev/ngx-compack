import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ngModel][dateMask]'
})
export class DateMaskDirective {

  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  constructor(
    private _el: ElementRef,
    private _renderer: Renderer2) { }

  @HostListener('dragstart', ['$event'])
  onDragstart(evt: DragEvent) {
    evt.preventDefault();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    let selectionStart = this._el.nativeElement.selectionStart;
    let selectionEnd = this._el.nativeElement.selectionEnd;
    let valueLength = this._el.nativeElement.value.length;
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
    const arr = oldValue.split('.');
    if (arr[0] && arr[1] && arr[2]) {
      let caretPosition = this._el.nativeElement.selectionStart;
      const deletedSymbol = this._el.nativeElement.value[caretPosition - 1];
      if (deletedSymbol == '.')
        evt.preventDefault();
    }
  }

  private _setInputText(key: string, evt: KeyboardEvent) {
    const oldValue = this._el.nativeElement.value;

    let caretPosition = this._el.nativeElement.selectionStart;
    let newDate = oldValue.slice(0, caretPosition) + key + oldValue.slice(caretPosition, oldValue.length);

    if (caretPosition != this._el.nativeElement.selectionEnd)
      evt.preventDefault();

    if (newDate.length > 10)
      return;

    // console.log('insert into: ', oldValue, 'value: ', key, 'and res: ', newDate);

    if (newDate.length == 1)
      if (+key > 3) {
        newDate = `0${key}`;
        caretPosition += 2;
      }

    const arr = newDate.split('.');
    var day = arr[0];
    var month = arr[1];
    var year = arr[2];

    if (day) {
      if (day.length == 1)
        if (+day > 4) {
          caretPosition++;
          day = `0${day}`;
        }
      if (+day > 31)
        day = `31`;
      if (day.length == 2)
        caretPosition++;

      newDate = `${day}.`;
    }

    let monthEarling = false;
    if (month) {
      if (month.length == 1)
        if (+month > 1) {
          caretPosition++;
          month = `0${month}`;
        }
        else {
          monthEarling = true;
          newDate = `${day}.${month}`;
          if (year) {
            caretPosition--;
          }
        }
      if (+month > 12) {
        if (+month[0] == 0) {
          year = month[2];
          month = `${month[0]}${month[1]}`;
          caretPosition++;
        }
        else {
          if (month.length > 2) {
            year = month[2];
            caretPosition++;
          }
          month = `12`;
        }
      }

      if (!monthEarling)
        newDate = `${day}.${month}.`;
    }

    if (year) {
      if (year.length > 4)
        year = year.substring(0, 4);

      newDate = `${day}.${month}.${year}`;
      // caretPosition--;
    }

    this.updateValue(newDate, evt);
    this._el.nativeElement.selectionStart = caretPosition + 1;
    this._el.nativeElement.selectionEnd = caretPosition + 1;

    // const arr = newDate.split('.');
    // if (arr.length == 3) {

    //   if (arr[0].length == 1)
    //     if (+arr[0] > 4) {
    //       caretPosition++;
    //       arr[0] = `0${arr[0]}`;
    //     }
    //   if (+arr[0] > 31)
    //     arr[0] = `31`;

    //   if (arr[1].length == 1)
    //     if (+arr[1] > 1) {
    //       caretPosition++;
    //       arr[1] = `0${arr[1]}`;
    //     }
    //   if (+arr[1] > 12)
    //     arr[1] = `12`;

    //   if (arr[2].length > 4)
    //     arr[2] = arr[2].substring(0, 4);

    //   newDate = `${arr[0]}.${arr[1]}.${arr[2]}`;


    //   this.updateValue(newDate, evt);
    //   this._el.nativeElement.selectionStart = caretPosition + 1;
    //   this._el.nativeElement.selectionEnd = caretPosition + 1;

    // } else {

    //   let newResultArr = [];

    //   let i = 0;
    //   for (let char of newDate) {
    //     if (char !== '.') {
    //       newResultArr.push(char);
    //       if (i == 1 || i == 3) {
    //         newResultArr.push('.');
    //         caretPosition++;
    //       }
    //       i++;
    //     }
    //   }
    //   console.log('res arr: ', newResultArr, 'res str: ', newResultArr.join(''));

    //   newDate = newResultArr.join('');
    //   if (newDate.length > 10)
    //     newDate = newDate.substring(0, 10);

    //   this.updateValue(newDate, evt);
    //   this._el.nativeElement.selectionStart = caretPosition + 1;
    //   this._el.nativeElement.selectionEnd = caretPosition + 1;

    // }





    // const oldValue = this._el.nativeElement.value;
    // const length = oldValue.length;

    // if (length == 1 || length == 4) {
    //   var newValue = `${oldValue}${key}.`;
    //   console.log('newValue', newValue);

    //   this._renderer.setProperty(this._el.nativeElement, 'value', newValue);
    //   this.ngModel.update.emit(newValue);
    //   evt.preventDefault();
    // }

    // if (length == 2 || length == 5) {
    //   var newValue = `${oldValue}.${key}`;
    //   console.log('newValue', newValue);

    //   this._renderer.setProperty(this._el.nativeElement, 'value', newValue);
    //   this.ngModel.update.emit(newValue);
    //   evt.preventDefault();
    // }

  }

  private updateValue(newTime: string, evt: KeyboardEvent) {
    // console.log('newValue', newTime);
    this._renderer.setProperty(this._el.nativeElement, 'value', newTime);
    this.ngModelChange.emit(newTime);
    evt.preventDefault();
  }


}
