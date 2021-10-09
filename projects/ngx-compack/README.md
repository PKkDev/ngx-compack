## Introduction

This library is used in the author's personal works, but if someone likes the implementation and wants to use it too, I will only be glad.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.6.
Supported 9/10/11.

You can view  [live example](https://pkkdev.github.io/ngx-compack/ "live example")

[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)]()

## Table of contents

- [Introduction](#Introduction)
- [Table of contents](#table-of-contents)
- [Dependency](#dependency)
- [Components](#components)
	- [compack-date-picker](#compack-date-picke)
	- [compack-banner](#compack-banner)
	- [compack-toast](#compack-toast)

## Dependency

[BrowserAnimationsModule](https://angular.io/api/platform-browser/animations/BrowserAnimationsModule "BrowserAnimationsModule")
[MomentJs](https://momentjs.com/docs/ "MomentJs")

## Components
At the moment there are only 3 different components with their own individual settings.

### compack-date-picker

For generate date using MomenJs

#### Import in project:

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

#### Using:

    import { Component, OnInit } from '@angular/core';
    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.scss']
    })
    export class AppComponent implements OnInit {
    
     public min = moment().add(-3, 'd');
     public max = moment().add(5, 'd');
    
    constructor( ) { }
    
    	ngOnInit() { }
    	}
    }

add in app.component.htm:

     <compack-date-picker [useTime]="true" [maxChoseDay]="5" [max]="max" [min]="min"></compack-date-picker>
	
	 <compack-date-picker [locale]="'en'" [type]="'icon'" [maxChoseDay]="5" [max]="max" [min]="min"></compack-date-picker>
	
	  <compack-date-picker [type]="'line'" [maxChoseDay]="5" [max]="max" [min]="min"></compack-date-picker>

#### Example:

<div style="display: flex; flex-direction:row; justify-content: space-between">
  <img height="500px" width="340px" style="text-align: center;" src="https://raw.githubusercontent.com/PKkDev/ngx-compack/main/examples_icon/date_range_picker_1.png">
  <img height="500px" width="340px" style="text-align: center;" src="https://raw.githubusercontent.com/PKkDev/ngx-compack/main/examples_icon/date_range_picker_2.png">
</div>

<div style="display: flex; flex-direction:row; justify-content: space-between">
  <img height="500px" width="340px" style="text-align: center;" src="https://raw.githubusercontent.com/PKkDev/ngx-compack/main/examples_icon/date_range_picker_3.png">
</div>

#### Properties:

parameters with which there is changed data-picker behavior

Name | Default | Description
------------ | -------------| -------------
@Input() <br> rangeMode: boolean | false |  select one date or range
@Input() <br> type: string |  'block' | type of picker -'block', 'line' or 'icon'
@Input() <br> viewFieldSelectedDate: boolean | false |  display field with selected date
@Input() <br> formatOutputDate: string | undefined |  exit date format
@Input() <br> useTime: boolean | false | add time field or not
@Input() <br> autoSelect: boolean | false|  auto select date after choose
@Input() <br> maxChoseDay: number | undefined | maximum range for selection
@Input() <br> max: string | undefined | date limit from below
@Input() <br> min: string | undefined | date cut from above
@Input() <br> locale: string | 'en' | Moment locale

#### Events:

Events generated from date picker

Name | Default | Description
------------ | -------------| -------------
@Output() <br> selectLastDateEvent: EventEmitter<string[]> | EventEmitter | event select date

### compack-banner

is the message hanging in the foreground.

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

#### Type positions:

    export enum TypePositionMessage {
        Top = 0,
        TopLeft = 1,
        TopRight = 2,
        Middle = 3,
        Bottom = 4,
        BottomLeft = 5,
        BottomRight = 6
    }

#### Type banner:

    export enum TypeMessage {
        Info = 0,
        Error = 1
    }

#### Import in project:

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

#### Using:

For view banner need call method **viewBanner() **in Injected service **Compackbannerservice**

    public viewBanner(typeMessage: TypeMessage, position: TypePositionMessage, message: string, title?: string, intervalView?: number)

#### Example:

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



#### Result:

<p align="center">
  <img height="150px" width="400px" style="text-align: center;" src="https://raw.githubusercontent.com/PKkDev/ngx-compack/main/examples_icon/banner_example.png">
</p>

#### Using api:
add CompackBannerService from DI in constructor.

Method | Description
------------ | -------------
 viewBanner(typeMessage: TypeMessage, position: TypePositionMessage, message: string, title?: string, intervalView?: number) | add new banner
removeBanner() |  remove last banner
setInfoColor(color: string) | set back color for info type banner
setErrorColor(color: string) | set back color for error type banner

### compack-toast

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

#### type toast:
    export declare enum TypeToast {
        Error = 0,
        Info = 1,
        Success = 2
    }

#### Import in project:

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

#### Using:

For view toast message need call method **emitNotife() **in Injected service **CompackToastService**

    public emitNotife(type: TypeToast, title: string, message?: string);

#### Example:
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


#### Result:

<p align="center">
  <img height="200px" width="400px" style="text-align: center;" src="https://raw.githubusercontent.com/PKkDev/ngx-compack/main/examples_icon/toast_example.png">
</p>


#### Using api:
add CompackToastService from DI in constructor.

Method | Description
------------ | -------------
 emitNotife(type: TypeToast, title: string, message?: string) | add new message
setInfoColor(color: string) | set back color for info type message
setErrorColor(color: string) | set back color for error type message
setSuccessColor(color: string) | set back color for success type message
setTimeToAutoRemove(time: number) | set time to auto remove message
