import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBtnComponent } from './display-btn.component';
import { CmpButtonDirective, CompackCardComponent } from 'ngx-compack';
import { CodeSnippetDirective } from '../../code-snippet.directive';

describe('DisplayBtnComponent', () => {
  let component: DisplayBtnComponent;
  let fixture: ComponentFixture<DisplayBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayBtnComponent, CompackCardComponent, CmpButtonDirective, CodeSnippetDirective]
    });
    fixture = TestBed.createComponent(DisplayBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
