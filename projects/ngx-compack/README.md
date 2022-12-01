## Introduction

This library is used in the author's personal works, but if someone likes the implementation and wants to use it too, I will only be glad.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.0.
Supported 9/10/11+.

You can view  [live example](https://pkkdev.github.io/ngx-compack/ "live example")

[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)]()

## Table of contents

- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Dependency](#dependency)
- [Components](#components)
  - [compack-date-picker-range](#compack-date-picker-range)
    - [Import in project](#import-in-project)
    - [Using](#using)
    - [Properties](#properties)
    - [Events](#events)
    - [CompackRelativeDateModel](#compackrelativedatemodel)
  - [compack-date-picker](#compack-date-picker)
    - [Import in project](#import-in-project-1)
    - [Using](#using-1)
    - [Properties](#properties-1)
    - [Events:](#events-1)
  - [compack-banner](#compack-banner)
    - [DisplayMessageConfig](#displaymessageconfig)
    - [TypePositions](#typepositions)
    - [TypeBanner](#typebanner)
    - [Import in project](#import-in-project-2)
    - [Using](#using-2)
    - [Using api](#using-api)
  - [compack-toast](#compack-toast)
    - [ToastConfig](#toastconfig)
    - [TypeToast](#typetoast)
    - [Import in project](#import-in-project-3)
    - [Using](#using-3)
    - [Using api](#using-api-1)

## Dependency

[BrowserAnimationsModule](https://angular.io/api/platform-browser/animations/BrowserAnimationsModule "BrowserAnimationsModule")

## Components

### compack-date-picker-range

<div style="display: flex; flex-direction:row; justify-content: space-between; flex-wrap:wrap">
  <img  style="text-align: center;" src="https://raw.githubusercontent.com/PKkDev/ngx-compack/main/examples_icon/cdpr_1.png">
  <img style="text-align: center;" src="https://raw.githubusercontent.com/PKkDev/ngx-compack/main/examples_icon/cdpr_2.png">
</div>

#### Import in project

    import { CompackDatepickerModule } from 'ngx-compack';
	import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
    
    @NgModule({
      ...
      imports: [
	  BrowserAnimationsModule,
      CompackDatepickerModule
      ...
    })
    export class AppModule { }

#### Using

add `compackDatePickerRangeHost`  directive to element <br> or create `<compack-date-picker-range></compack-date-picker-range>` in code
Example:

```html
<compack-date-picker-range [locale]="'en'" (selectLastDateEvent)="selectLastDateEventRange($event)">
</compack-date-picker-range>

<input placeholder="click me" compackDatePickerRangeHost [locale]="'en'"
  (selectLastDateEvent)="selectLastDateEventRange($event)" [disabled]="false" [formatOutputDate]="'dd-mm-yyyy'" />

<div compackDatePickerRangeHost (selectLastDateEvent)="selectLastDateEventRange($event)" [relativeDateModel]="[]">
  click me
</div>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" compackDatePickerRangeHost [locale]="localeRange"
  (selectLastDateEvent)="selectLastDateEventRange($event)" [disabled]="disabledRange"
  [formatOutputDate]="formatOutputDateRange" [relativeDateModel]="relativeDateModel">
  <path d="M0 0h24v24H0z" fill="none" />
  <path
    d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
</svg>
```

#### Properties

parameters with which there is changed data-picker-range behavior

| Name | Default | Description |
| -------------------------------------------- | --------- | ----------------------------------------------------------- |
| @Input() <br> locale: string | 'en' | [Intl.Locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale "Intl.Locale") |
| @Input() <br> disabled: boolean | false | disabled state |
| @Input() <br> formatOutputDate: string|'dd.mm.yyyy' | after accept date will convert to this format |
| @Input() <br> relativeDateModel: CompackRelativeDateModel[] | undefined | relative date in left side picker|

#### Events

Events generated from date-picker-range

| Name | Default | Description |
| ---------------------------------------------------------- | ------------ | ----------------- |
| @Output() <br> selectLastDateEvent | `EventEmitter<string[]>` | event after select date |

#### CompackRelativeDateModel

<div style="display: flex; flex-direction:row; justify-content: flex-start">
  <img  style="text-align: center;" src="https://raw.githubusercontent.com/PKkDev/ngx-compack/main/examples_icon/cdpr_4.png">
</div>

```javascript
export interface CompackRelativeDateModel {
    title: string;
    dateStartFunc: () => Date;
    dateEndFunc: () => Date
}
```

| field  | descrption  |
| ------------ | ------------ |
| title  | displayed name for period in calendar  |
| dateStartFunc  |  func returned start date  |
|  dateEndFunc |  func returned end date   |

example:

```javascript
      {
        title: 'last 7 day',
        dateStartFunc: () => {
          const date = new Date(new Date().setHours(0, 0, 0, 0));
          date.setDate(date.getDate() - 7);
          return date;
        },
        dateEndFunc: () => new Date(new Date().setHours(0, 0, 0, 0))
      },
```

### compack-date-picker

<div style="display: flex; flex-direction:row; justify-content: space-between">
  <img height="345px" width="316px" style="text-align: center;" src="https://raw.githubusercontent.com/PKkDev/ngx-compack/main/examples_icon/cdp_1.png">
  <img height="387px" width="321px" style="text-align: center;" src="https://raw.githubusercontent.com/PKkDev/ngx-compack/main/examples_icon/cdp_2.png">
</div>

#### Import in project

    import { CompackDatepickerModule } from 'ngx-compack';
	import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
    
    @NgModule({
      ...
      imports: [
	  BrowserAnimationsModule,
      CompackDatepickerModule
      ...
    })
    export class AppModule { }

#### Using

add `compackDatePickerHost`  directive to element <br> or create `<compack-date-picker></compack-date-picker>` in code
Example:

```html
<svg compackDatePickerHost class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" [locale]="'en'"
  [type]="'icon'" [maxChoseDay]="5" [max]="max" [min]="min" (selectLastDateEvent)="selectLastDateEvent($event)">
  <path d="M0 0h24v24H0z" fill="none" />
  <path
    d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
</svg>

<compack-date-picker [locale]="'en'" [type]="'icon'" [maxChoseDay]="5" [max]="max" [min]="min">
</compack-date-picker>

<compack-date-picker [type]="'line'" [maxChoseDay]="5" [max]="max" [min]="min">
</compack-date-picker>
```

#### Properties

parameters with which there is changed data-picker behavior

| Name | Default | Description|
| -------------------------------------------- | --------- | ----------------------------------------------------------- |
| @Input() <br> locale: string | 'en' | [Intl.Locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale "Intl.Locale") |
| @Input() <br> disabled: boolean | false | disabled state |
| @Input() <br> rangeMode: boolean | false | select one date or range |
| @Input() <br> viewFieldSelectedDate: boolean | false | display field with selected date |
| @Input() <br> useTime: boolean | false  | add time field or not |
| @Input() <br> autoSelect: boolean | false | auto select date after choose <br> only without **useTime** |
| @Input() <br> maxChoseDay: number | undefined | maximum range for selection |
| @Input() <br> max: Date | undefined | date limit from below |
| @Input() <br> min: Date | undefined | date cut from above |
| @Input() <br> formatOutputDate: string|'dd.mm.yyyy' | after accept date will convert to this format |

#### Events:

Events generated from date picker

| Name | Default | Description |
| ---------------------------------------------------------- | ------------ | ----------------- |
| @Output() <br> selectLastDateEvent | `EventEmitter<string[]>` | event after select date |

### compack-banner

is the message hanging in the foreground.

<p align="center">
  <img style="text-align: center;" src="https://raw.githubusercontent.com/PKkDev/ngx-compack/main/examples_icon/banner_example.png">
</p>

#### DisplayMessageConfig
    export class DisplayMessageConfig {
        public title?: string;
        public message: string;
        public intervalView?: number;
        public typeMessage: TypeMessage;
        public position: TypePositionMessage;
    
        constructor() {
            this.title = undefined;
            this.message = '';
            this.intervalView = undefined;
            this.typeMessage = 0;
            this.position = 0;
        }
    }

#### TypePositions

    export enum TypePositionMessage {
        Top = 0,
        TopLeft = 1,
        TopRight = 2,
        Middle = 3,
        Bottom = 4,
        BottomLeft = 5,
        BottomRight = 6
    }

#### TypeBanner

    export enum TypeMessage {
        Info = 0,
        Error = 1
    }

#### Import in project

    import { CompackBannerModule } from 'ngx-compack';
	import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
    
    @NgModule({
      ...
      imports: [
        CompackBannerModule,
		BrowserAnimationsModule
      ...
    })
    export class AppModule { }

#### Using

For view banner need call method `viewBanner()` in Injected service `Compackbannerservice`

    public viewBanner(typeMessage: TypeMessage, position: TypePositionMessage, message: string, title?: string, intervalView?: number)

    import { Component, OnInit } from '@angular/core';
    import { TypeMessage, TypePositionMessage } from 'ngx-compack';
    import { CompackBannerService, DisplayMessageConfig } from 'ngx-compack';
	
    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.scss']
    })
    export class AppComponent implements OnInit {
	
    constructor(private cbs: CompackBannerService ) { }
    
    ngOnInit() {
		this.cbs.setInfoColor('#000');
    	this.cbs.setErrorColor('#fff');
       setTimeout(() => this.cbs.viewBanner(TypeMessage.Info, TypePositionMessage.TopRight, 'asdas'), 0);
    	}
    }

#### Using api

add CompackBannerService from DI in constructor.

| Method | Description |
| -------------------------------- | ------------------------------------ |
| viewBanner(typeMessage: TypeMessage, position: TypePositionMessage, message: string, title?: string, intervalView?: number) | add new banner |
| removeBanner() | remove last banner |
| setInfoColor(color: string) | set back color for info type banner  |
| setErrorColor(color: string) | set back color for error type banner |

### compack-toast

<p align="center">
  <img style="text-align: center;" src="https://raw.githubusercontent.com/PKkDev/ngx-compack/main/examples_icon/toast_example.png">
</p>

#### ToastConfig

    export class ToastConfig {
        public title: string;
        public type: TypeToast;
        public message?: string;
    
        constructor() {
            this.title = '';
            this.type = TypeToast.Error
        }
    }

#### TypeToast

    export declare enum TypeToast {
        Error = 0,
        Info = 1,
        Success = 2
    }

#### Import in project

    import { CompackToastModule } from 'ngx-compack';
	import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
    
    @NgModule({
      ...
      imports: [
        CompackToastModule,
        BrowserAnimationsModule
      ...
    })
    export class AppModule { }

#### Using

For view toast message need call method `emitNotife()` in Injected service `CompackToastService`

    public emitNotife(type: TypeToast, title: string, message?: string);

	import { Component, OnInit } from '@angular/core';
    import { CompackToastService, TypeToast } from 'ngx-compack';
	
    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.scss']
    })
    export class AppComponent implements OnInit {
    
    constructor(private cts: CompackToastService) { }
    
    ngOnInit() {
    	this.cts.emitNotife(TypeToast.Error, 'Error Error ErrorError ErrorErrorErrorErrorError vErrorError Error Error');
    	this.cts.emitNotife(TypeToast.Info, 'Info');
    }
    }


#### Using api

add CompackToastService from DI in constructor.

| Method | Description |
| ------------------------------------------------------------ | --------------------------------------- |
| emitNotife(type: TypeToast, title: string, message?: string) | add new message |
| setInfoColor(color: string) | set back color for info type message |
| setErrorColor(color: string) | set back color for error type message |
| setSuccessColor(color: string) | set back color for success type message |
| setTimeToAutoRemove(time: number) | set time to auto remove message |
