import { Component } from '@angular/core';
import { CompackSideBarService, SideBarConfig } from 'ngx-compack';
import { SideBarExampleComponent } from './side-bar-example/side-bar-example.component';
import { CompackCodeSnippetModel } from '../../code-snippet.directive';

@Component({
  selector: 'app-display-side-bar',
  templateUrl: './display-side-bar.component.html',
  styleUrls: ['./display-side-bar.component.scss']
})
export class DisplaySideBarComponent {

  public title: string | undefined = 'Test Title';
  public viewCloseBtn = true;
  public dialogWidth: string | undefined = '700px';
  public dialogData: Record<string, string> = {
    test: 'test data'
  }

  public snippet: CompackCodeSnippetModel[] = [{
    title: 'ts',
    type: 'other',
    code:
      `
public dialogData: Record<string, string> = {
  test: 'test data'
}

constructor(private csbs: CompackSideBarService) { }

const config: SideBarConfig = {
  title: this.title,
  dialogWidth: this.dialogWidth,
  viewCloseBtn: this.viewCloseBtn
}
  
this.csbs.openSideBar(
  SideBarExampleComponent,
  config,
  this.dialogData);
  `
  }];

  constructor(private csbs: CompackSideBarService) { }

  public onOpen() {

    const config: SideBarConfig = {
      title: this.title,
      dialogWidth: this.dialogWidth,
      viewCloseBtn: this.viewCloseBtn
    }

    this.csbs.openSideBar(
      SideBarExampleComponent,
      config,
      this.dialogData);
  }

}
