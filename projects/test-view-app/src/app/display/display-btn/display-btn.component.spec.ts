import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBtnComponent } from './display-btn.component';

describe('DisplayBtnComponent', () => {
  let component: DisplayBtnComponent;
  let fixture: ComponentFixture<DisplayBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayBtnComponent]
    });
    fixture = TestBed.createComponent(DisplayBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
