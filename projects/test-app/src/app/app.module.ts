import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompackBannerModule, CompackToastModule, CompackDatepickerModule } from 'ngx-compack';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestCreatedComponent } from './test-created/test-created.component';

@NgModule({
  declarations: [
    AppComponent,
    TestCreatedComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CompackDatepickerModule,
    CompackBannerModule,
    CompackToastModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
