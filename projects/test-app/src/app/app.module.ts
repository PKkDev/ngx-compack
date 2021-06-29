import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
// compack
import { CompackBannerModule, CompackToastModule, CompackDatepickerModule } from 'ngx-compack';
// components
import { TestCreatedComponent } from './test-created/test-created.component';

@NgModule({
  declarations: [
    AppComponent,
    TestCreatedComponent
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,

    CompackDatepickerModule,
    CompackBannerModule,
    CompackToastModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
