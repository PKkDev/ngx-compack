import { Component } from '@angular/core';
import { CompackCodeSnippetModel } from '../../code-snippet.directive';

@Component({
  selector: 'app-display-btn',
  templateUrl: './display-btn.component.html',
  styleUrls: ['./display-btn.component.scss']
})
export class DisplayBtnComponent {

  public snippet: CompackCodeSnippetModel[] = [{
    title: 'html',
    type: 'html',
    code:
      `
      <button cmp-button btnType="default">default</button>
      <button cmp-button btnType="primary">primary</button>
      <button cmp-button btnType="dangerous">dangerous</button>
      <button cmp-button btnType="mode">mode</button>
    `
  }];


}
