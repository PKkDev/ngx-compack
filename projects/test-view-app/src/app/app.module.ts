import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
