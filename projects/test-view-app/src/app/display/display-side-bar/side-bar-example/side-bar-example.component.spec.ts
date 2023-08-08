import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarExampleComponent } from './side-bar-example.component';

describe('SideBarExampleComponent', () => {
  let component: SideBarExampleComponent;
  let fixture: ComponentFixture<SideBarExampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideBarExampleComponent]
    });
    fixture = TestBed.createComponent(SideBarExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
