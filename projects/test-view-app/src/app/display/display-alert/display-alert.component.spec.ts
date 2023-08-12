import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAlertComponent } from './display-alert.component';

describe('DisplayAlertComponent', () => {
  let component: DisplayAlertComponent;
  let fixture: ComponentFixture<DisplayAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayAlertComponent]
    });
    fixture = TestBed.createComponent(DisplayAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
