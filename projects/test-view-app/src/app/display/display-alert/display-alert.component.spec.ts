import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAlertComponent } from './display-alert.component';
import { CompackAlertComponent, CompackCardComponent } from 'ngx-compack';
import { CodeSnippetDirective } from '../../code-snippet.directive';

describe('DisplayAlertComponent', () => {
  let component: DisplayAlertComponent;
  let fixture: ComponentFixture<DisplayAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayAlertComponent, CompackCardComponent, CompackAlertComponent, CodeSnippetDirective]
    });
    fixture = TestBed.createComponent(DisplayAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
