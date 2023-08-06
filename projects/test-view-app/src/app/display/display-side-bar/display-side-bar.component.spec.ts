import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySideBarComponent } from './display-side-bar.component';

describe('DisplaySideBarComponent', () => {
  let component: DisplaySideBarComponent;
  let fixture: ComponentFixture<DisplaySideBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplaySideBarComponent]
    });
    fixture = TestBed.createComponent(DisplaySideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
