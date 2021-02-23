## Introduction

This library is used in the author's personal works, but if someone likes the implementation and wants to use it too, I will only be glad.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.6.
Supported 9/10/11.

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

    <div style="position: absolute; left:50%; top:30%">
        <compack-date-picker [useTime]="true" [maxChoseDay]="5" [max]="max" [min]="min"></compack-date-picker>
    </div>
	
	 <compack-date-picker [locale]="'en'" [type]="'icon'" [maxChoseDay]="5" [max]="max" [min]="min">
    </compack-date-picker>
	
	  <compack-date-picker [type]="'line'" [maxChoseDay]="5" [max]="max" [min]="min"></compack-date-picker>

#### Example:

<div style="display: flex; flex-direction:row; justify-content: space-between">
  <img height="400px" width="350px" style="text-align: center;" src="https://raw.githubusercontent.com/PKkDev/ngx-compack/main/examples_icon/date_range_picker_1.png">
  <img height="400px" width="350px" style="text-align: center;" src="https://raw.githubusercontent.com/PKkDev/ngx-compack/main/examples_icon/date_range_picker_2.png">
</div>

<div style="display: flex; flex-direction:row; justify-content: space-between">
  <img height="400px" width="350px" style="text-align: center;" src="https://raw.githubusercontent.com/PKkDev/ngx-compack/main/examples_icon/date_range_picker_3.png">
</div>

#### Properties:

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
		
        const config: DisplayMessageConfig = {
          message: 'this website is intended solely for testing functions',
          position: TypePositionMessage.TopRight,
          typeMessage: TypeMessage.Info
        }
        this.cbs.addNewMessage(config);
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
 addNewMessage(config: DisplayMessageConfig) | add new banner
removeMessage() |  remove last banner
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
         this.cts.emitNewNotif({ title: 'Error', message: 'Body Error', type: TypeToast.Error });
		 this.cts.emitNewNotif({ title: 'Error', type: TypeToast.Error });
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
 emitNewNotif(message: ToastConfig) | add new message
setInfoColor(color: string) | set back color for info type message
setErrorColor(color: string) | set back color for error type message
setSuccessColor(color: string) | set back color for success type message

