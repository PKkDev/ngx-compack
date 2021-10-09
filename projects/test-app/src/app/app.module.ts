import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
// compack
import { CompackBannerModule, CompackToastModule, CompackDatepickerModule } from 'ngx-compack';
// color-picker
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,

    ColorPickerModule,

    CompackDatepickerModule,
    CompackBannerModule,
    CompackToastModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
