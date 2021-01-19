import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompackBannerModule, CompackToastModule, CompackDatepickerModule } from 'ngx-compack';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CompackDatepickerModule,
    CompackBannerModule,
    CompackToastModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
