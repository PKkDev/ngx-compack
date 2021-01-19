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
    
    @NgModule({
      ...
      imports: [
        CompackDatepickerModule,
        BrowserAnimationsModule
      ...
    })
    export class AppModule { }

#### Using:

#### Result:

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
        const config: DisplayMessageConfig = {
          message: 'this website is intended solely for testing functions',
          position: TypePositionMessage.TopRight,
          typeMessage: TypeMessage.Info
        }
        this.cbs.addNewMessage(config);
    }
    }

only 1 time in main -  app.component.html:

    <compack-banner [backClassName]="'test'" [errorColor]="'#eee'" [infoColor]="'#909B02'"></compack-banner>

#### Result:

<p align="center">
  <img height="150px" width="400px" style="text-align: center;" src="https://raw.githubusercontent.com/PKkDev/ngx-compack/main/examples_icon/banner_example.png">
</p>

![banner](https://github.com/PKkDev/ngx-compack/blob/main/examples_icon/banner_example.png "banner")

#### Properties:

Name | Description
------------ | -------------
@Input() <br> backClassName: string | main back class
@Input() <br> infoColor: string |  hex color info type
@Input() <br> errorColor: string | hex color error type

### compack-toast

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

only 1 time in main -  app.component.html:

    <compack-toast [messageClassName]="'test'" [errorColor]="'#eee'" [infoColor]="'#909B02'" [successColor]="'#332299'">
</compack-toast>

#### Result:

<p align="center">
  <img height="200px" width="400px" style="text-align: center;" src="https://raw.githubusercontent.com/PKkDev/ngx-compack/main/examples_icon/toast_example.png">
</p>



#### Properties:

Name | Description
------------ | -------------
@Input() <br> messageClassName: string | main back class message container
@Input() <br> infoColor: string |  hex color info type
@Input() <br> errorColor: string | hex color error type
@Input() <br> successColor: string | hex color success type

