import { Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { CompackCodeSnippetModel } from '../../code-snippet.directive';

@Component({
  selector: 'app-display-dp',
  templateUrl: './display-dp.component.html',
  styleUrls: ['./display-dp.component.scss']
})
export class DisplayDpComponent {

  public snippet1: CompackCodeSnippetModel[] = [new CompackCodeSnippetModel(
    'html',
    'html',
    `<compack-date-picker [rangeMode]="rangeMode" [disabled]="disabled" [setDateEvent]="setDateEvent" [viewFieldSelectedDate]="viewFieldSelectedDate" [format]="format" [useTime]="useTime"
    [maxChoseDay]="maxChoseDay" [locale]="locale" [max]="max" [min]="min" [autoSelect]="autoSelect" (selectLastDateEvent)="selectDateEvent($event)"> </compack-date-picker>`)];


  public snippet2: CompackCodeSnippetModel[] = [new CompackCodeSnippetModel(
    'html',
    'html',
    `<input compackDatePickerHost style="margin: 10px 0 ;" placeholder="click me" [rangeMode]="rangeMode" [disabled]="disabled" [setDateEvent]="setDateEvent" [viewFieldSelectedDate]="viewFieldSelectedDate"
    [formatOutputDate]="format" [useTime]="useTime" [maxChoseDay]="maxChoseDay" [locale]="locale" [max]="max" [min]="min" [autoSelect]="autoSelect" 
    (selectLastDateEvent)="selectDateEvent($event)" />`)];

  public snippet3: CompackCodeSnippetModel[] = [new CompackCodeSnippetModel(
    'html',
    'html',
    `<div compackDatePickerHost style="border: thin solid black; border-radius: 6px;" [rangeMode]="rangeMode" [disabled]="disabled" [setDateEvent]="setDateEvent" 
    [viewFieldSelectedDate]="viewFieldSelectedDate" [formatOutputDate]="format" [useTime]="useTime" [maxChoseDay]="maxChoseDay" [locale]="locale"  [max]="max" 
    [min]="min" [autoSelect]="autoSelect"  (selectLastDateEvent)="selectDateEvent($event)"> click me </div>`)];

  public snippet4: CompackCodeSnippetModel[] = [new CompackCodeSnippetModel(
    'html',
    'html',
    `<svg compackDatePickerHost xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="margin: 10px 0;width: 30px;height: 30px;" [rangeMode]="rangeMode" [disabled]="disabled"
    [setDateEvent]="setDateEvent" [viewFieldSelectedDate]="viewFieldSelectedDate" [formatOutputDate]="format" [useTime]="useTime" [maxChoseDay]="maxChoseDay" [locale]="locale" [max]="max" [min]="min"
    [autoSelect]="autoSelect" (selectLastDateEvent)="selectDateEvent($event)"> <path d="M0 0h24v24H0z" fill="none" />
    <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" /> </svg>`)];

  public setDateEvent: EventEmitter<Date[]> = new EventEmitter<Date[]>();

  public OnSetDate() {
    const dateS = new Date(new Date().setHours(0, 0, 0, 0));
    dateS.setDate(dateS.getDate() - 7);
    dateS.setHours(15);
    dateS.setMinutes(20);
    const dateE = new Date(new Date().setHours(0, 0, 0, 0));
    dateE.setHours(5);
    dateE.setMinutes(15);
    this.setDateEvent.emit([dateS, dateE]);
  }

  public format = `dd.mm.yyyy'T'HH:MM`;
  public locale = 'en';
  public useTime = true;
  public rangeMode = false;
  public disabled = false;
  public autoSelect = false;
  public viewFieldSelectedDate = true;
  public maxChoseDay = 5;
  public min: Date | undefined = undefined;
  public max: Date | undefined = undefined;
  public selectedDateOneStr = 'none';
  public selectedDateTwoStr = 'none'
  // public initialSelectedDate: string[] | undefined = ['asd'];

  public selectDateEvent(selected: string[]) {
    this.selectedDateOneStr = 'none';
    this.selectedDateTwoStr = 'none';
    if (selected.length == 1) {
      this.selectedDateOneStr = selected[0];
      return;
    }
    if (selected.length == 2) {
      this.selectedDateOneStr = selected[0];
      this.selectedDateTwoStr = selected[1];
      return;
    }
    this.selectedDateOneStr = 'error';
    this.selectedDateTwoStr = 'error';
  }

  public selectMinDateEvent(selected: string[]) {
    this.min = new Date(selected[0]);
  }

  public selectMaxDateEvent(selected: string[]) {
    this.max = new Date(selected[0]);
  }

  public snippet2222: CompackCodeSnippetModel[] = [new CompackCodeSnippetModel('html', 'html', '')];
  @ViewChild('test') test: ElementRef | undefined;

  public onTest() {
    console.log(this.test);
    console.log(this.test?.nativeElement.toString());
    console.log('outerHTML', this.test?.nativeElement.innerHTML);


    let html = this.test?.nativeElement.innerHTML!;

    // html = html.replace(/(\r\n|\n|\r)/gm, "").replace(/\n/g, '').replace(/\t/g, '').replace(/\s+/g, ' ').trim();
    // console.log(html);


    this.snippet2222 = [new CompackCodeSnippetModel('html', 'html2', html)]
  }




}
