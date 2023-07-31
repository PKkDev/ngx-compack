/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ForTestComponent } from './for-test.component';

describe('ForTestComponent', () => {
  let component: ForTestComponent;
  let fixture: ComponentFixture<ForTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
