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
// compack
import { CompackBannerModule, CompackToastModule, CompackDatepickerModule, CompackButtonModule } from 'ngx-compack';
import { CodeSnippetDirective } from './code-snippet.directive';


import { CompackSideBarModule } from 'projects/ngx-compack/src/lib/compack-side-bar/compack-side-bar.module';

@NgModule({
  declarations: [
    AppComponent,
    CodeSnippetDirective,
    DisplayBComponent,
    DisplayDpComponent,
    DisplayDprComponent,
    DisplayTComponent,
    DisplayDfsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    CompackSideBarModule,
    // compack
    CompackToastModule,
    CompackBannerModule,
    CompackDatepickerModule,
    CompackButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
