import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompackAlertComponent } from './compack-alert.component';

describe('CompackAlertComponent', () => {
  let component: CompackAlertComponent;
  let fixture: ComponentFixture<CompackAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompackAlertComponent]
    });
    fixture = TestBed.createComponent(CompackAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
