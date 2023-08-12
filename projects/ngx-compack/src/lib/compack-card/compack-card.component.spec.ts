import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompackCardComponent } from './compack-card.component';

describe('CompackCardComponent', () => {
  let component: CompackCardComponent;
  let fixture: ComponentFixture<CompackCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompackCardComponent]
    });
    fixture = TestBed.createComponent(CompackCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
