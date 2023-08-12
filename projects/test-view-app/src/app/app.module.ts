import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
// display
import { DisplayBComponent } from './display/display-b/display-b.component';
import { DisplayDpComponent } from './display/display-dp/display-dp.component';
import { DisplayDprComponent } from './display/display-dpr/display-dpr.component';
import { DisplayTComponent } from './display/display-t/display-t.component';
import { DisplayDfsComponent } from './display/display-dfs/display-dfs.component';
import { DisplayBtnComponent } from './display/display-btn/display-btn.component';
import { DisplaySideBarComponent } from './display/display-side-bar/display-side-bar.component';
import { DisplaySnippetComponent } from './display/display-snippet/display-snippet.component';
import { SideBarExampleComponent } from './display/display-side-bar/side-bar-example/side-bar-example.component';
import { DisplayAlertComponent } from './display/display-alert/display-alert.component';

import { CodeSnippetDirective } from './code-snippet.directive';
// compack
import { CompackToastModule, CompackDatepickerModule, CompackButtonModule, CompackSideBarModule, CompackBannerModule, CompackCardModule, CompackAlertModule } from 'ngx-compack';


@NgModule({
  declarations: [
    AppComponent,
    CodeSnippetDirective,
    DisplayBComponent,
    DisplayDpComponent,
    DisplayDprComponent,
    DisplayTComponent,
    DisplayDfsComponent,
    DisplayBtnComponent,
    DisplaySideBarComponent,
    DisplaySnippetComponent,
    SideBarExampleComponent,
    DisplayAlertComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    // compack
    CompackToastModule,
    CompackBannerModule,
    CompackDatepickerModule,
    CompackButtonModule,
    CompackSideBarModule,
    CompackCardModule,
    CompackAlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
