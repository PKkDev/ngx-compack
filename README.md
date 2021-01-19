## Introduction

This library is used in the author's personal works, but if someone likes the implementation and wants to use it too, I will only be glad.
Supported Andular 9+ .

[TOC]

## components
At the moment there are only 3 different components with their own individual settings.


### compack-date-picker
    import { CompackDatepickerModule } from 'ngx-compack';
    
    @NgModule({
      ...
      imports: [
        CompackDatepickerModule,
        BrowserModule
      ...
    })
    export class AppModule { }

#### Properties

Name | Description
------------ | -------------
@Input() <br> type: string | type of picker -'block', 'line' or 'icon'
@Input() <br> formatOutputDate: string |  exit date format
@Input() <br> useTime: boolean |  add time field or not
@Input() <br> maxChoseDay: number | maximum range for selection
@Input() <br> max: string | date limit from below
@Input() <br> min: string | date cut from above
@Input() <br> locale: string | Moment locale
@Output() <br> selectLastDateEvent: EventEmitter<string[]> |  event select date

### compack-banner
    import { CompackBannerModule } from 'ngx-compack';
    
    @NgModule({
      ...
      imports: [
        CompackBannerModule,
        BrowserModule
      ...
    })
    export class AppModule { }

#### Properties
Name | Description
------------ | -------------
@Input() <br> backClassName: string | main back class
@Input() <br> infoColor: string |  hex color info type
@Input() <br> errorColor: string | hex color error type

### compack-toast
    import { CompackToastModule } from 'ngx-compack';
    
    @NgModule({
      ...
      imports: [
        CompackToastModule,
        BrowserModule
      ...
    })
    export class AppModule { }

#### Properties
Name | Description
------------ | -------------
@Input() <br> messageClassName: string | main back class message container
@Input() <br> infoColor: string |  hex color info type
@Input() <br> errorColor: string | hex color error type
@Input() <br> successColor: string | hex color success type

# Hub

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
