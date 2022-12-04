import { Component, OnInit } from '@angular/core';
import { CompackDateFormatService } from 'ngx-compack';

export class MaskDescription {
  public mask: string;
  public description: string;

  constructor(mask: string, description: string) {
    this.mask = mask;
    this.description = description;
  }
}

@Component({
  selector: 'app-display-dfs',
  templateUrl: './display-dfs.component.html',
  styleUrls: ['./display-dfs.component.scss']
})
export class DisplayDfsComponent implements OnInit {

  public snippet1 =
    `import { CompackDatepickerModule } from 'ngx-compack';

    @NgModule({
      declarations: [AppComponent],
      imports: [
        ...
        CompackDatepickerModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }`;
  public snippet2 =
    `import { CompackDateFormatService } from 'ngx-compack';

constructor(private cdfs: CompackDateFormatService) { }
      
this.cdfs.dateFormat(new Date(), 'yyyy-mm-dd')`;

  public maskDescription: MaskDescription[] = [
    new MaskDescription('d', 'Day of the month as digits; no leading zero for single-digit days'),
    new MaskDescription('dd', 'Day of the month as digits; leading zero for single-digit days'),
    new MaskDescription('ddd', 'Day of the week as a three-letter abbreviation'),
    new MaskDescription('dddd', 'Day of the week as its full name'),
    new MaskDescription('m', 'Month as digits; no leading zero for single-digit months'),
    new MaskDescription('mm', 'Month as digits; leading zero for single-digit months'),
    new MaskDescription('mmm', 'Month as a three-letter abbreviation'),
    new MaskDescription('mmmm', 'Month as its full name'),
    new MaskDescription('yy', 'Year as last two digits; leading zero for years less than 10'),
    new MaskDescription('yyyy', 'Year represented by four digits'),
    new MaskDescription('H', 'Hours; no leading zero for single-digit hours (24-hour clock)'),
    new MaskDescription('HH', 'Hours; leading zero for single-digit hours (24-hour clock)'),
    new MaskDescription('M', 'Minutes; no leading zero for single-digit minutes'),
    new MaskDescription('MM', 'Minutes; leading zero for single-digit minutes')
  ];

  private dateToParse: Date | undefined = undefined;

  public mask1: string = 'yyyy-mm-dd';
  public result1: string = '';

  public mask2: string = `dd.mm.yyyy'T'HH:MM`;
  public result2: string = '';

  public mask3: string = 'mmmm dddd';
  public result3: string = '';

  public mask4: string = 'dd.mm.yy';
  public result4: string = '';

  public mask5: string = 'HH:MM';
  public result5: string = '';

  constructor(
    private cdfs: CompackDateFormatService) { }

  ngOnInit() { }

  public selectMaxDateEvent(selected: string[]) {
    this.dateToParse = new Date(selected[0]);

    this.result1 = this.cdfs.dateFormat(this.dateToParse, this.mask1);
    this.result2 = this.cdfs.dateFormat(this.dateToParse, this.mask2);
    this.result3 = this.cdfs.dateFormat(this.dateToParse, this.mask3);
    this.result4 = this.cdfs.dateFormat(this.dateToParse, this.mask4);
    this.result5 = this.cdfs.dateFormat(this.dateToParse, this.mask5);
  }

}
