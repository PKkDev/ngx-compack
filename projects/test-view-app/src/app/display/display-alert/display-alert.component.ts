import { Component } from '@angular/core';
import { CompackCodeSnippetModel } from '../../code-snippet.directive';

@Component({
  selector: 'app-display-alert',
  templateUrl: './display-alert.component.html',
  styleUrls: ['./display-alert.component.scss']
})
export class DisplayAlertComponent {

  public message = 'Test message for alert';

  public messageLarge = 'Test message for alert Test message for alert Test message for alert Test message for alert'

  public messageLarge2 =
    `Test message for alert Test message for alert 
    Test message for alert Test message for alert \n new line`


  public snippet: CompackCodeSnippetModel[] = [{
    title: 'html',
    type: 'html',
    code:
      `
      <compack-alert [type]="'error'" [message]="message"></compack-alert>
      <compack-alert [type]="'info'" [message]="message"></compack-alert>
      <compack-alert [type]="'info'" [message]="message" [viewIcon]="false"></compack-alert> 
      <compack-alert [type]="'success'" [message]="message"></compack-alert> 
      <compack-alert [type]="'success'" [message]="messageLarge"></compack-alert> 
      <compack-alert [type]="'info'" [message]="messageLarge2"></compack-alert>
    `
  }];

}
