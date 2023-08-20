import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySnippetComponent } from './display-snippet.component';

describe('DisplaySnippetComponent', () => {
  let component: DisplaySnippetComponent;
  let fixture: ComponentFixture<DisplaySnippetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplaySnippetComponent]
    });
    fixture = TestBed.createComponent(DisplaySnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
