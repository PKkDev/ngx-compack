import { Component, Inject } from '@angular/core';
import { SIDE_BAR_DATA } from 'ngx-compack';
import { CompackCodeSnippetModel } from '../../../code-snippet.directive';

@Component({
  selector: 'app-side-bar-example',
  templateUrl: './side-bar-example.component.html',
  styleUrls: ['./side-bar-example.component.scss']
})
export class SideBarExampleComponent {

  public dialogData: Record<string, string> | undefined;

  public snippet: CompackCodeSnippetModel[] = [{
    title: 'ts',
    type: 'other',
    code:
      `
public dialogData: Record<string, string> | undefined;

constructor(@Inject(SIDE_BAR_DATA) dialogData: Record<string, string>) {
    this.dialogData = dialogData
  }`
  },
  {
    title: 'html',
    type: 'html',
    code: `<div>{{dialogData | json}}</div>`
  }];

  constructor(@Inject(SIDE_BAR_DATA) dialogData: Record<string, string>) {
    this.dialogData = dialogData
  }

}
