import { Component } from '@angular/core';
import { CompackRelativeDateModel } from 'ngx-compack';
import { CompackCodeSnippetModel } from '../../code-snippet.directive';

@Component({
  selector: 'app-display-dpr',
  templateUrl: './display-dpr.component.html',
  styleUrls: ['./display-dpr.component.scss']
})
export class DisplayDprComponent {

  public snippet1: CompackCodeSnippetModel[] = [new CompackCodeSnippetModel('html', 'html',
    `<compack-date-picker-range 
    [locale]="locale" [disabled]="disabled"
    [formatOutputDate]="format" 
    (selectLastDateEvent)="selectDateEvent($event)">
</compack-date-picker-range>`)];
  public snippet2: CompackCodeSnippetModel[] = [new CompackCodeSnippetModel('html', 'html',
    `<input compackDatePickerRangeHost placeholder="click me" 
    style="margin: 10px 0 ;" [disabled]="disabled"
    [locale]="locale" [formatOutputDate]="format"
    (selectLastDateEvent)="selectDateEvent($event)"/>`)];
  public snippet3: CompackCodeSnippetModel[] = [new CompackCodeSnippetModel('html', 'html',
    `<div style="border: thin solid black; border-radius: 6px;" 
    compackDatePickerRangeHost 
    [locale]="locale" [formatOutputDate]="format" 
    [relativeDateModel]="[]" [disabled]="disabled"
    (selectLastDateEvent)="selectDateEvent($event)" >
    click me
</div>`)];
  public snippet4: CompackCodeSnippetModel[] = [new CompackCodeSnippetModel('html', 'html',
    `<svg style="margin: 10px 0;width: 30px;height: 30px;" 
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
    compackDatePickerRangeHost [locale]="locale" [disabled]="disabled"
    [formatOutputDate]="format" [relativeDateModel]="relativeDateModel"
    (selectLastDateEvent)="selectDateEvent($event)">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
</svg>`)];

  public relativeDateModel: CompackRelativeDateModel[] = [
    {
      title: 'last 7 day',
      dateStartFunc: () => {
        const date = new Date(new Date().setHours(0, 0, 0, 0));
        date.setDate(date.getDate() - 7);
        return date;
      },
      dateEndFunc: () => new Date(new Date().setHours(0, 0, 0, 0))
    },
  ];
  public format = `dd.mm.yyyy`;
  public locale = 'en';
  public disabled = false;
  public selectedDateOneStrRange = 'none';
  public selectedDateTwoStrRange = 'none'
  public selectDateEvent(selected: string[]) {
    this.selectedDateOneStrRange = 'none';
    this.selectedDateTwoStrRange = 'none';
    if (selected.length == 1) {
      this.selectedDateOneStrRange = selected[0];
      return;
    }
    if (selected.length == 2) {
      this.selectedDateOneStrRange = selected[0];
      this.selectedDateTwoStrRange = selected[1];
      return;
    }
    this.selectedDateOneStrRange = 'error';
    this.selectedDateTwoStrRange = 'error';
  }
}
